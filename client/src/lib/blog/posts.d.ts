declare module "virtual:blog-posts" {
  const posts: import("./types").BlogPost[];
  export default posts;
}
