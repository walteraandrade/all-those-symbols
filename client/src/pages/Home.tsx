import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NetworkBackground } from "@/components/NetworkBackground";
import { ContentNode } from "@/components/ContentNode";
import { nodes, bio, projects, experience, skills, socialLinks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Linkedin, Mail, Play, Pause, SkipForward, SkipBack, Terminal, Music } from "lucide-react";

export default function Home() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden font-sans selection:bg-primary/20">
      
      {/* Background Layer */}
      <NetworkBackground nodes={nodes} activeNodeId={activeNode} />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-screen flex flex-col pointer-events-none">
        
        {/* Header / Brand */}
        <header className="absolute top-8 left-8 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-foreground">
              WALTER<span className="text-primary">.</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-mono mt-2">
              Logic <span className="text-accent mx-2">×</span> Philosophy <span className="text-accent mx-2">×</span> Code
            </p>
          </motion.div>
        </header>

        {/* Central Hub (Visual anchor) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_var(--color-primary)] z-0" />

        {/* Interactive Nodes */}
        <div className="absolute inset-0 pointer-events-auto">
          {nodes.map((node) => (
            <ContentNode
              key={node.id}
              {...node}
              isActive={activeNode === node.id}
              onClick={handleNodeClick}
            />
          ))}
        </div>

        {/* Active Content Overlay */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-12 pointer-events-none z-30"
            >
              <div className="pointer-events-auto w-full max-w-4xl max-h-[80vh] bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Content Panel */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-border flex justify-between items-center bg-card/50">
                    <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
                      {nodes.find(n => n.id === activeNode)?.icon && (
                         nodes.find(n => n.id === activeNode)?.icon({} as any)
                      )} 
                      {nodes.find(n => n.id === activeNode)?.title}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveNode(null)} className="hover:bg-destructive/10 hover:text-destructive">
                      Close [ESC]
                    </Button>
                  </div>
                  
                  <ScrollArea className="flex-1 p-6 md:p-8">
                    {/* BIO SECTION */}
                    {activeNode === 'bio' && (
                      <div className="space-y-8">
                        <div className="prose prose-invert max-w-none">
                          <p className="text-lg leading-relaxed text-muted-foreground font-light">
                            {bio}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-accent" /> Experience
                          </h3>
                          <div className="space-y-6">
                            {experience.map((exp, i) => (
                              <div key={i} className="border-l-2 border-primary/20 pl-4 py-1">
                                <h4 className="font-bold text-foreground">{exp.role}</h4>
                                <div className="text-sm text-accent mb-2">{exp.company} | {exp.period}</div>
                                <p className="text-sm text-muted-foreground">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-display font-bold mb-4">Tech Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {[...skills.languages, ...skills.frontend, ...skills.backend].map(skill => (
                              <Badge key={skill} variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                          <div className="flex gap-4">
                            <Button variant="outline" size="icon" asChild>
                              <a href={`mailto:${socialLinks.email}`}><Mail className="w-4 h-4" /></a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <a href={`https://linkedin.com${socialLinks.linkedin}`} target="_blank"><Linkedin className="w-4 h-4" /></a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <a href={`https://github.com/${socialLinks.github.replace('@', '')}`} target="_blank"><Github className="w-4 h-4" /></a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PROJECTS SECTION */}
                    {activeNode === 'projects' && (
                      <div className="grid grid-cols-1 gap-6">
                        {projects.map((project, i) => (
                          <Card key={i} className="bg-card/50 border-primary/10 hover:border-primary/30 transition-colors">
                            <CardHeader>
                              <CardTitle className="flex justify-between items-start">
                                <span className="font-display text-xl">{project.title}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </CardTitle>
                              <CardDescription className="font-mono text-accent text-xs">
                                {project.role}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground mb-4">{project.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                  <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground font-mono">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* MUSIC SECTION */}
                    {activeNode === 'music' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-card to-background p-8 rounded-xl border border-primary/20 flex flex-col items-center text-center space-y-6">
                          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center relative overflow-hidden animate-pulse-slow">
                            <Music className="w-16 h-16 text-primary" />
                            <div className="absolute inset-0 border-4 border-primary/30 rounded-full border-t-primary animate-spin-slow" />
                          </div>
                          
                          <div>
                            <h3 className="text-2xl font-display font-bold">Currently Listening</h3>
                            <p className="text-muted-foreground">Philosophy & Lo-Fi Beats</p>
                          </div>

                          <div className="w-full max-w-sm bg-secondary/50 p-4 rounded-lg flex items-center gap-4">
                            <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
                              <span className="text-xs text-white font-mono">COVER</span>
                            </div>
                            <div className="flex-1 text-left">
                              <div className="h-2 w-3/4 bg-foreground/20 rounded mb-2" />
                              <div className="h-2 w-1/2 bg-foreground/10 rounded" />
                            </div>
                            <div className="flex gap-2 text-primary">
                              <SkipBack className="w-4 h-4" />
                              <Pause className="w-4 h-4" />
                              <SkipForward className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded border border-border bg-card/30">
                             <h4 className="font-bold mb-2 text-accent">Top Genres</h4>
                             <ul className="text-sm space-y-1 text-muted-foreground">
                               <li>• Classical Baroque</li>
                               <li>• Math Rock</li>
                               <li>• IDM / Glitch</li>
                             </ul>
                           </div>
                           <div className="p-4 rounded border border-border bg-card/30">
                             <h4 className="font-bold mb-2 text-accent">Recent Obsessions</h4>
                             <ul className="text-sm space-y-1 text-muted-foreground">
                               <li>• Bach - Goldberg Variations</li>
                               <li>• Aphex Twin</li>
                               <li>• Steve Reich</li>
                             </ul>
                           </div>
                        </div>
                      </div>
                    )}

                    {/* WRITING SECTION */}
                    {activeNode === 'blog' && (
                      <div className="space-y-8">
                         <article className="border-b border-border pb-8">
                           <div className="text-xs font-mono text-primary mb-2">Dec 14, 2025 • Philosophy</div>
                           <h3 className="text-2xl font-display font-bold mb-4 hover:text-accent cursor-pointer transition-colors">
                             The Rigor of Logic vs. The Fluidity of Code
                           </h3>
                           <p className="text-muted-foreground leading-relaxed">
                             In formal logic, a contradiction is fatal. In software engineering, a race condition is often just a Tuesday. 
                             Transitioning from the absolute truths of mathematical philosophy to the heuristic reality of distributed systems 
                             taught me that perfection is not about the absence of error, but the elegance of recovery...
                           </p>
                           <Button variant="link" className="pl-0 mt-2 text-primary">Read more →</Button>
                         </article>

                         <article className="border-b border-border pb-8">
                           <div className="text-xs font-mono text-primary mb-2">Nov 02, 2025 • Life</div>
                           <h3 className="text-2xl font-display font-bold mb-4 hover:text-accent cursor-pointer transition-colors">
                             Why I Cook Like I Code
                           </h3>
                           <p className="text-muted-foreground leading-relaxed">
                             Mise en place is just dependency injection for the kitchen. Understanding the heat capacity of a cast iron skillet 
                             is no different than understanding the throughput of a database connection pool. It's all about resource management...
                           </p>
                           <Button variant="link" className="pl-0 mt-2 text-primary">Read more →</Button>
                         </article>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="absolute bottom-8 right-8 text-right pointer-events-auto">
          <p className="text-xs text-muted-foreground font-mono opacity-50">
            © 2025 Walter Andrade<br />
            System Status: <span className="text-primary">ONLINE</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
