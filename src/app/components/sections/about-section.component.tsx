import { FadeIn } from "@/app/components/animations/fade-in.component";

export const AboutSection = () => {
  return (
    <section id="about" className="w-full py-20 lg:py-32 max-w-[800px] m-auto flex items-center gap-[40px]">
      <FadeIn>
       <div className="max-w-3xl mx-auto px-4 text-center">
         <h2 className="text-3xl font-bold mb-4">From Logic to Code</h2>
         <p className="text-lg text-secondary leading-relaxed text-[18px]/[28px]">
           As a child, I was captivated by computers and the world of reading. My formal academic journey began with studies in literature and journalism, before I delved into philosophy, where I discovered a profound love for formal logic and the philosophy of mathematics. This rigorous, first-principles approach naturally led me to programming. I now apply this foundation to leading teams and architecting full-stack applications, thriving on building elegant, efficient systems. I am currently at the forefront of exploring and implementing solutions in the new frontiers of Artificial Intelligence and Large Language Models.
         </p>
       </div>
      </FadeIn>
    </section>
  )
}
