import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

@Injectable()
export class AppService {
  async processFile(file: { file: string }): Promise<string> {
    const pdfBuffer = Buffer.from(file.file, 'base64');
    const pdfBlob = new Blob([pdfBuffer]);

    const pdfDocument = await new PDFLoader(pdfBlob).load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // Adjust this value based on your chunking needs
      chunkOverlap: 100, // Overlap to preserve context between chunks
    });

    const splitDocs = await textSplitter.splitDocuments(pdfDocument);

    return splitDocs.map((doc) => doc.pageContent).join('\n');
  }
}
