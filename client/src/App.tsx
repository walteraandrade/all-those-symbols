import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MotionProvider } from "@/contexts/MotionContext";
import { AudioProvider } from "@/contexts/AudioContext";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import NotFound from "@/pages/not-found";

const Home = lazy(() => import("@/pages/Home"));
const Bio = lazy(() => import("@/pages/Bio"));
const Projects = lazy(() => import("@/pages/Projects"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bio" component={Bio} />
      <Route path="/projects" component={Projects} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <AudioProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Router />
                </Suspense>
              </Layout>
            </TooltipProvider>
          </QueryClientProvider>
        </AudioProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}

export default App;
