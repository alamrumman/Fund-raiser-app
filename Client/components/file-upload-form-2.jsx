import { Paperclip, Send, X } from "lucide-react";
import * as React from "react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

import {
  FileUpload,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "../components/ui/file-upload";

const Example = () => {
  const [files, setFiles] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [upiref, setUpiref] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // 🔐 STEP 1: Get signature
  const getSignature = async () => {
    const res = await fetch("https://fund-raiser-app.onrender.com/api/cloudinary/signature");

    if (!res.ok) {
      throw new Error("Failed to get signature");
    }

    const data = await res.json();
    console.log(data);
    return data; // IMPORTANT
  };

  // ☁️ STEP 2: Upload image
  const uploadImage = async (file) => {
    const { timestamp, signature, apiKey, cloudName } = await getSignature();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "fundraiser_support");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await res.json();
    console.log(data);
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  };

  // 🚀 FINAL SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !upiref || !message || files.length === 0) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const imageData = await uploadImage(files[0]);

      const res = await fetch(
        "https://fund-raiser-app.onrender.com/api/ticket/create-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            upiRef: upiref,
            message,
            image: imageData,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Backend error:", data);

        throw new Error("Ticket creation failed");
      }

      alert("Ticket submitted successfully!");

      setName("");
      setUpiref("");
      setMessage("");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>UPI Reference Number</Label>
        <Input
          type="text"
          placeholder="Reference number"
          required
          value={upiref}
          onChange={(e) => setUpiref(e.target.value)}
        />
      </div>

      <FileUpload
        value={files}
        onValueChange={setFiles}
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        multiple={false}
      >
        <FileUploadList className="mb-2">
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file} className="p-2">
              <FileUploadItemPreview className="size-8" />
              <FileUploadItemMetadata size="sm" />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-6">
                  <X className="size-3" />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>

        <div className="flex gap-2 rounded-lg border bg-background p-2">
          <FileUploadTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 shrink-0">
              <Paperclip className="size-4" />
            </Button>
          </FileUploadTrigger>

          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 h-20"
          />

          <Button
            type="submit"
            size="icon"
            disabled={loading}
            className="size-8 shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </FileUpload>
    </form>
  );
};

export default Example;
