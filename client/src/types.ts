export interface Post {
 identifier:string
 title:string
 slug:string
 body?:string
 subName:string
 createdAt:string
 updatedAt:string
 username:string
 //virtual fields
 url:string
 voteScore?:number
 commentCount?:number
 userVote?:number
}