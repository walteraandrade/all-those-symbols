import { lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
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
const Contact = lazy(() => import("@/pages/Contact"));

const Preview = lazy(() => import("@/pages/Preview"));
const PreviewBrutalist = lazy(() => import("@/pages/preview/Brutalist"));
const PreviewEditorial = lazy(() => import("@/pages/preview/Editorial"));
const PreviewRetroFuturistic = lazy(() => import("@/pages/preview/RetroFuturistic"));
const PreviewOrganic = lazy(() => import("@/pages/preview/Organic"));
const PreviewArtDeco = lazy(() => import("@/pages/preview/ArtDeco"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bio" component={Bio} />
      <Route path="/projects" component={Projects} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PreviewRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/preview" component={Preview} />
        <Route path="/preview/brutalist" component={PreviewBrutalist} />
        <Route path="/preview/editorial" component={PreviewEditorial} />
        <Route path="/preview/retro-futuristic" component={PreviewRetroFuturistic} />
        <Route path="/preview/organic" component={PreviewOrganic} />
        <Route path="/preview/art-deco" component={PreviewArtDeco} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [location] = useLocation();
  const isPreview = location.startsWith("/preview");

  if (isPreview) {
    return (
      <QueryClientProvider client={queryClient}>
        <PreviewRouter />
      </QueryClientProvider>
    );
  }

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
