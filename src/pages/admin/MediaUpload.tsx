import { useState } from "react";
import { Upload, Link, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MediaUpload = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");

  const copyUrl = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "URL copied to clipboard." });
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Media Upload</h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest text-primary mb-4">External Link</h3>
          <p className="text-muted-foreground text-xs mb-4">
            Paste a YouTube or Google Drive link to use in your portfolio.
          </p>
          <input
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm mb-3"
          />
          <button
            onClick={copyUrl}
            disabled={!url}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            <Link size={14} /> Copy URL
          </button>
        </div>

        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest text-primary mb-4">Thumbnails</h3>
          <p className="text-muted-foreground text-xs mb-4">
            Video thumbnails are auto-generated from YouTube URLs. Use the Portfolio Manager to add videos with YouTube links.
          </p>
          <div className="w-full h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs">Coming soon: file uploads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
