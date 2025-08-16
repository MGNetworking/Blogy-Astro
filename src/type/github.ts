export interface GitHubFileMetadata {
  title: string;
  date: string;
  time: string;
  author: string;
  tags: string[];
  description: string;
  filename: string;
  img: string;
}

export interface GitHubFile {
  metadata: GitHubFileMetadata;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  time: string;
  author: string;
  tags: string[];
  description: string;
  img: string;
}
