export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}


  export interface Items {
    score: number;
    word: string;    
  }
  
  export interface User {
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
    }
}