"use client";
import { Paperclip, Send } from "lucide-react";
import { Upload, X } from "lucide-react";
import * as React from "react";

import { Button } from ".././components/ui/button";
import { Input } from ".././components/ui/input";
import { Label } from ".././components/ui/label";
import { Textarea } from ".././components/ui/textarea";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from ".././components/ui/file-upload";

export const title = "Contact Form with Attachments";

const Example = () => {
  const [files, setFiles] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [upiref, setUpiref] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form submitted with", files.length, "attachments");
    alert(`Form submitted with ${files.length} attachment(s)`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleSend = () => {
    if (message.trim() || files.length > 0) {
      console.log("Sending:", { message, files, upiref });
      setMessage("");
      setFiles([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Upi reference number</Label>
        <Input
          type="text"
          placeholder="Reference number"
          required
          value={upiref}
          onChange={(e) => {
            setUpiref(e.target.value);
          }}
        />
      </div>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        maxFiles={2}
        maxSize={2 * 1024 * 1024}
        multiple
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
        <div className="flex  gap-2 rounded-lg border bg-background p-2">
          <FileUploadTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 shrink-0">
              <Paperclip className="size-4" />
            </Button>
          </FileUploadTrigger>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 h-20 "

          />
          <Button
            size="icon"
            className="size-8 shrink-0"
            onClick={handleSend}
            disabled={!message.trim() && files.length === 0}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </FileUpload>
    </form>
  );
};

export default Example;
