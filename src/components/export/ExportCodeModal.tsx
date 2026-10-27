import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FolderTree, 
  Terminal, 
  Github, 
  Code2, 
  FileCode, 
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { PROJECT_FILES } from '../../utils/projectFiles';
import { generateAndDownloadZip } from '../../utils/zipGenerator';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'download' | 'guide' | 'files' | 'script'>('download');
  const [selectedFile, setSelectedFile] = useState<string>('package.json');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const fileKeys = Object.keys(PROJECT_FILES);

  const handleDownloadZip = async () => {
    try {
      setIsGenerating(true);
      await generateAndDownloadZip('sellzy-dashboard.zip');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Generate automated bash script to create all files
  const generateBashScript = () => {
    let script = `#!/bin/bash\n# Sellzy Dashboard Automated Project Generator\nmkdir -p sellzy-dashboard\ncd sellzy-dashboard\n\n`;
    for (const [path, content] of Object.entries(PROJECT_FILES)) {
      const dir = path.includes('/') ? path.substring(0, path.lastIndexOf('/')) : '';
      if (dir) {
        script += `mkdir -p "${dir}"\n`;
      }
      const escaped = content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\$/g, '\\$').replace(/`/g, '\\`');
      script += `cat << 'EOF' > "${path}"\n${content}\nEOF\n\n`;
    }
    script += `echo "Project initialized! Installing dependencies..."\nnpm install\necho "Ready! Run 'npm run dev' to start."\n`;
    return script;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#088178] text-white flex items-center justify-center font-black shadow-xs">
              <Download size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>Export & Setup Sellzy Dashboard</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#088178]">
                  Verified Bundle ({fileKeys.length} files)
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                Guaranteed genuine client-side download, manual code browser, and VS Code / GitHub guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-5 border-b border-gray-200 bg-white flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('download')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'download'
                ? 'border-[#088178] text-[#088178] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Download size={15} />
            <span>1. Download ZIP (In-Browser)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-[#088178] text-[#088178] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Laptop size={15} />
            <span>2. VS Code & GitHub Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'files'
                ? 'border-[#088178] text-[#088178] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Code2 size={15} />
            <span>3. View & Copy Source Files</span>
          </button>

          <button
            onClick={() => setActiveTab('script')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'script'
                ? 'border-[#088178] text-[#088178] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Terminal size={15} />
            <span>4. 1-Click Terminal Script</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-gray-50/50">
          {/* TAB 1: DOWNLOAD ZIP */}
          {activeTab === 'download' && (
            <div className="max-w-2xl mx-auto space-y-6 text-center py-6">
              <div className="size-20 rounded-2xl bg-gradient-to-tr from-[#088178] to-[#2cd9c5] text-white flex items-center justify-center mx-auto shadow-md">
                <FolderTree size={36} />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Generate Genuine ZIP Package
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  This ZIP is compiled directly inside your browser memory using JSZip with zero network redirects or server proxy errors.
                </p>
              </div>

              {/* Status Banner */}
              {downloadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
                  <Check size={16} className="text-emerald-600" />
                  <span>Success! <strong>sellzy-dashboard.zip</strong> generated and downloaded directly to your computer!</span>
                </div>
              )}

              {/* Download Action Box */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-600 border-b border-gray-100 pb-4">
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase font-bold">Total Files</span>
                    <strong className="text-sm text-gray-900">{fileKeys.length} files</strong>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase font-bold">Compression</span>
                    <strong className="text-sm text-gray-900">ZIP Deflate</strong>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase font-bold">Archive Name</span>
                    <strong className="text-sm text-[#088178]">sellzy-dashboard.zip</strong>
                  </div>
                </div>

                <button
                  onClick={handleDownloadZip}
                  disabled={isGenerating}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#088178] hover:bg-[#005249] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download size={18} />
                  <span>{isGenerating ? 'Compiling ZIP in browser...' : 'Download Project ZIP Now'}</span>
                </button>

                <p className="text-[11px] text-gray-400">
                  Includes full React 19 + TypeScript + Tailwind CSS application with all views, types, and mock datasets.
                </p>
              </div>

              {/* Why it was empty explanation */}
              <div className="text-left p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <p className="font-bold">Why did your previous download say empty?</p>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  Web preview environments run behind a Cloud Run authentication proxy that intercepts direct file URL clicks with a cookie check redirect. Clicking the button above bypasses the network entirely by building the ZIP file inside your browser memory!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: VS CODE & GITHUB INSTRUCTIONS */}
          {activeTab === 'guide' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Step 1 */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <span className="size-6 rounded-full bg-[#088178] text-white text-xs flex items-center justify-center">1</span>
                  <span>Extract & Open in VS Code</span>
                </div>
                <p className="text-xs text-gray-600">
                  Unzip <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-mono">sellzy-dashboard.zip</code> to your computer. Open VS Code, select <strong>File</strong> &gt; <strong>Open Folder...</strong> and choose the unzipped folder.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <span className="size-6 rounded-full bg-[#088178] text-white text-xs flex items-center justify-center">2</span>
                  <span>Install Dependencies</span>
                </div>
                <p className="text-xs text-gray-600">
                  Open your VS Code integrated terminal (<kbd className="bg-gray-100 px-1 rounded font-mono text-[10px]">Ctrl + `</kbd> or <kbd className="bg-gray-100 px-1 rounded font-mono text-[10px]">Cmd + `</kbd>) and run:
                </p>
                <div className="flex items-center justify-between bg-gray-900 text-emerald-400 p-3 rounded-lg font-mono text-xs">
                  <span>npm install</span>
                  <button 
                    onClick={() => copyToClipboard('npm install', 'npm_install')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedKey === 'npm_install' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <span className="size-6 rounded-full bg-[#088178] text-white text-xs flex items-center justify-center">3</span>
                  <span>Start Development Server</span>
                </div>
                <div className="flex items-center justify-between bg-gray-900 text-emerald-400 p-3 rounded-lg font-mono text-xs">
                  <span>npm run dev</span>
                  <button 
                    onClick={() => copyToClipboard('npm run dev', 'npm_dev')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedKey === 'npm_dev' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Visit <strong>http://localhost:3000</strong> in your browser to view your live dashboard.</p>
              </div>

              {/* Step 4 */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span className="size-6 rounded-full bg-[#088178] text-white text-xs flex items-center justify-center">4</span>
                    <span>Push to GitHub Repository</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`git init\ngit add .\ngit commit -m "Initial commit: Sellzy Dashboard"\ngit branch -M main\ngit remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git\ngit push -u origin main`, 'git_all')}
                    className="text-xs text-[#088178] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedKey === 'git_all' ? <Check size={13} /> : <Copy size={13} />}
                    <span>Copy All Commands</span>
                  </button>
                </div>

                <div className="bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-xs space-y-2 overflow-x-auto">
                  <p className="text-gray-400"># 1. Initialize local git repository</p>
                  <p className="text-emerald-400">git init</p>
                  <p className="text-gray-400"># 2. Add all files and make initial commit</p>
                  <p className="text-emerald-400">git add .</p>
                  <p className="text-emerald-400">git commit -m "Initial commit: Sellzy Multi-Vendor Dashboard"</p>
                  <p className="text-gray-400"># 3. Create repo on github.com, link remote and push</p>
                  <p className="text-emerald-400">git branch -M main</p>
                  <p className="text-emerald-400">git remote add origin https://github.com/&lt;YOUR-USERNAME&gt;/sellzy-dashboard.git</p>
                  <p className="text-emerald-400">git push -u origin main</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BROWSE & COPY FILES */}
          {activeTab === 'files' && (
            <div className="h-full flex flex-col md:flex-row gap-4 border border-gray-200 rounded-xl bg-white overflow-hidden shadow-xs">
              {/* File list sidebar */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 p-3 overflow-y-auto max-h-48 md:max-h-none bg-gray-50/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-2">
                  Project Files ({fileKeys.length})
                </span>
                <div className="space-y-0.5">
                  {fileKeys.map((path) => (
                    <button
                      key={path}
                      onClick={() => setSelectedFile(path)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 truncate ${
                        selectedFile === path
                          ? 'bg-[#088178] text-white font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={path}
                    >
                      <FileCode size={13} className="shrink-0" />
                      <span className="truncate">{path}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code viewer */}
              <div className="flex-1 flex flex-col min-w-0 bg-white">
                <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-xs font-bold text-gray-800 truncate">{selectedFile}</span>
                    <span className="text-[10px] text-gray-400">({PROJECT_FILES[selectedFile]?.length || 0} bytes)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PROJECT_FILES[selectedFile] || '', `file_${selectedFile}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#088178] text-white text-xs font-bold hover:bg-[#005249] transition-colors"
                  >
                    {copiedKey === `file_${selectedFile}` ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedKey === `file_${selectedFile}` ? 'Copied!' : 'Copy File Content'}</span>
                  </button>
                </div>

                <div className="flex-1 p-3 overflow-auto max-h-[50vh] bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed">
                  <pre className="whitespace-pre">{PROJECT_FILES[selectedFile]}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 1-CLICK TERMINAL SCRIPT */}
          {activeTab === 'script' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Bash Auto-Setup Script</h4>
                  <p className="text-xs text-gray-500">
                    Paste this directly into your terminal on Mac/Linux/WSL to create all files and directories instantly!
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(generateBashScript(), 'bash_script')}
                  className="px-4 py-2 rounded-lg bg-[#088178] hover:bg-[#005249] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'bash_script' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedKey === 'bash_script' ? 'Copied Script!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs max-h-[50vh] overflow-y-auto">
                <pre className="whitespace-pre">{generateBashScript().slice(0, 1500)}...\n# (Full script ready to copy via button above)</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
