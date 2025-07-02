import { StaggerAnimation } from "@/app/components/animations/stagger-animation.component";

export const HeroSection = () => {
  return (
    <section id="home" className="md:h-[20vh] w-full flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-[56px] font-extrabold text-[#EAEAEA] mb-4">
        <StaggerAnimation text="<Walter Andrade />" />
      </h1>
      <p className="text-xl md:text-2xl text-secondary max-w-3xl">
        I transform complex problems into elegant digital solutions, with a foundation in logic and a focus on the future of technology.
      </p>
      <div className="flex justify-center gap-4 flex-col">
          <a href="#projects" className="px-6 py-3">
            View My Work
          </a>
          <a href="#contact" className="px-6 py-3 bg-primary text-background hover:opacity-90 transition-opacity">
            Get In Touch
          </a>
        </div>
    </section>
  );
};
