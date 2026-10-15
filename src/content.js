import {
  BookOpen,
  Combine,
  Scissors,
  Minimize2,
  LayoutGrid,
  Trash2,
  RotateCw,
  Crop,
  PenLine,
  LockKeyhole,
  Stamp,
  ListOrdered,
  Images,
  Image,
  ScanLine,
  FolderOpen,
  Share2,
  Smartphone,
  Layers,
  Code2,
  HardDrive,
} from 'lucide-react';

// Names verified against lib/features/tools/domain/tool_catalog.dart; reader is a separate app flow.
export const tools = [
  {
    name: 'Read PDF',
    description: 'Open, search and navigate your documents.',
    icon: BookOpen,
    category: 'Read & manage',
  },
  {
    name: 'Merge PDF',
    description: 'Bring multiple PDFs together in your order.',
    icon: Combine,
    category: 'Organize',
  },
  {
    name: 'Split PDF',
    description: 'Extract the pages or ranges you need.',
    icon: Scissors,
    category: 'Organize',
  },
  {
    name: 'Compress PDF',
    description: 'Balance smaller files with readable quality.',
    icon: Minimize2,
    category: 'Edit',
  },
  {
    name: 'Organize Pages',
    description: 'Put every page in the right sequence.',
    icon: LayoutGrid,
    category: 'Organize',
  },
  {
    name: 'Remove Pages',
    description: 'Leave out pages you no longer need.',
    icon: Trash2,
    category: 'Organize',
  },
  {
    name: 'Rotate Pages',
    description: 'Give selected pages the right orientation.',
    icon: RotateCw,
    category: 'Organize',
  },
  {
    name: 'Crop PDF',
    description: 'Trim page edges with a visual preview.',
    icon: Crop,
    category: 'Edit',
  },
  {
    name: 'Sign PDF',
    description: 'Place a drawn or saved handwritten signature.',
    icon: PenLine,
    category: 'Edit',
  },
  {
    name: 'Protect / Unlock PDF',
    description: 'Add a password or unlock with a valid one.',
    icon: LockKeyhole,
    category: 'Edit',
  },
  {
    name: 'Watermark PDF',
    description: 'Apply a text or image watermark.',
    icon: Stamp,
    category: 'Edit',
  },
  {
    name: 'Page Numbers',
    description: 'Add page numbers with configurable placement.',
    icon: ListOrdered,
    category: 'Edit',
  },
  {
    name: 'JPG / PNG to PDF',
    description: 'Arrange your images into one PDF.',
    icon: Images,
    category: 'Convert',
  },
  {
    name: 'PDF to JPG',
    description: 'Export document pages as JPG images.',
    icon: Image,
    category: 'Convert',
  },
  {
    name: 'Scan to PDF',
    description: 'Capture paper documents using your camera.',
    icon: ScanLine,
    category: 'Create',
    note: 'In testing · device support may vary',
  },
];

export const essentials = [
  {
    title: 'Read with focus.',
    text: 'A dedicated reader for opening, searching and moving through PDFs.',
    icon: BookOpen,
    label: 'READ',
    visual: 'read',
  },
  {
    title: 'Make it your own.',
    text: 'Edit pages, add a signature and get your document ready to share.',
    icon: PenLine,
    label: 'EDIT',
    visual: 'edit',
  },
  {
    title: 'Keep things together.',
    text: 'Find your files, organize pages and carry on where you left off.',
    icon: FolderOpen,
    label: 'ORGANIZE',
    visual: 'files',
  },
  {
    title: 'Change the format.',
    text: 'Turn JPG and PNG images into PDFs, or export PDF pages as JPGs.',
    icon: Images,
    label: 'CONVERT',
    visual: 'convert',
  },
  {
    title: 'Lighten the load.',
    text: 'Choose compression settings that balance file size and readability.',
    icon: Minimize2,
    label: 'COMPRESS',
    visual: 'compress',
  },
  {
    title: 'Send it on its way.',
    text: 'Save your finished file or share it through your Android apps.',
    icon: Share2,
    label: 'SHARE',
    visual: 'share',
  },
];

export const benefits = [
  {
    icon: Layers,
    title: 'One place to get it done',
    text: 'Move from reading to editing and sharing with tools built around the same document.',
  },
  {
    icon: Smartphone,
    title: 'Made for your Android',
    text: 'A focused interface with light and dark themes, clear controls and familiar navigation.',
  },
  {
    icon: HardDrive,
    title: 'Local document workflows',
    text: 'Supported PDF tools process files on your device. Ads and some services may need a connection.',
  },
  {
    icon: FolderOpen,
    title: 'Files within reach',
    text: 'Browse device PDFs, revisit recent documents and keep favorites close.',
  },
  {
    icon: Code2,
    title: 'Built carefully with Flutter',
    text: 'Flutter UI and native Android integrations work together to handle practical PDF tasks.',
  },
  {
    icon: ScanLine,
    title: 'Paper meets digital',
    text: 'An integrated scanner turns camera captures into PDF pages, with testing and refinements ongoing.',
  },
];

export const faqs = [
  [
    'What is PacePDF?',
    'PacePDF is an Android PDF utility app that brings a reader, document tools and file management into one place. It is designed for everyday tasks such as combining files, preparing documents and sharing the result.',
  ],
  [
    'Is PacePDF available on Android?',
    'Yes. PacePDF is available on Google Play for Android, built using Flutter and native Android integrations.',
  ],
  [
    'What PDF tools does PacePDF provide?',
    'The current app includes PDF reading, merging, splitting, compression, page organization, removal and rotation, cropping, signing, password protection and unlocking, watermarks, page numbers, JPG / PNG to PDF, PDF to JPG and Scan to PDF. OCR is marked Coming soon and is not advertised as available.',
  ],
  [
    'Is PacePDF available on Google Play?',
    'Yes, PacePDF is available on Google Play for Android.',
  ],
  [
    'Does PacePDF require an internet connection?',
    'Supported PDF processing workflows run on your device. Advertising, Google Play services and some setup or service features may use an internet connection. Scanner components may need an initial download. Availability can vary by device; the app is not presented as completely offline.',
  ],
  [
    'Can I scan documents with PacePDF?',
    'Yes. Scan to PDF is implemented using Google ML Kit Document Scanner. It lets you capture document pages and create a PDF. Scanner behavior is still being tested and improved across devices. Text recognition (OCR) remains Coming soon.',
  ],
  [
    'Who developed PacePDF?',
    'PacePDF is co-created and developed by Isa Shaikh and Faiz Sayyed. Both work on the app’s development and ongoing improvements. You can find their verified profile links in the developer section.',
  ],
];

export const previews = [
  {
    id: 'home',
    title: 'Your everyday starting point',
    label: 'Home',
    text: 'A focused overview of PDF tools.',
  },
  {
    id: 'tools',
    title: 'The right tool, within reach',
    label: 'Tools',
    text: 'A home for document workflows.',
  },
  {
    id: 'reader',
    title: 'Room for the document',
    label: 'Reader',
    text: 'A clear space to read and navigate.',
  },
  {
    id: 'files',
    title: 'Pick up where you left off',
    label: 'Files',
    text: 'Recent documents and file management.',
  },
  {
    id: 'compress',
    title: 'A little lighter to share',
    label: 'Compress PDF',
    text: 'File size and quality, considered together.',
  },
  {
    id: 'sign',
    title: 'Add your finishing touch',
    label: 'Sign PDF',
    text: 'A place for your handwritten signature.',
  },
];
