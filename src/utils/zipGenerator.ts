import JSZip from 'jszip';
import { PROJECT_FILES } from './projectFiles';

export async function generateAndDownloadZip(filename = 'sellzy-dashboard.zip') {
  const zip = new JSZip();

  // Add all project files into the root or sellzy-dashboard folder
  for (const [path, content] of Object.entries(PROJECT_FILES)) {
    zip.file(path, content);
  }

  // Generate zip file as blob
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  // Trigger download via temporary anchor
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Revoke object URL after delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  return blob.size;
}
