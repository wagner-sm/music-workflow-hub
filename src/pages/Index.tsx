import { Music, Disc3 } from "lucide-react";
import { WorkflowCard } from "@/components/WorkflowCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const executeSetlistFM = async () => {
    try {
      console.log("🚀 Iniciando chamada para Setlist.fm...");
      
      const response = await fetch("https://workers.wagnermetalcfc.workers.dev/setlistfm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "lovable-app",
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("📡 Status da resposta:", response.status);
      console.log("📡 Headers:", Object.fromEntries(response.headers.entries()));
      
      // Pegar o texto bruto primeiro
      const responseText = await response.text();
      console.log("📄 Resposta bruta:", responseText);

      if (response.ok) {
        try {
          // Tentar parsear o JSON
          const data = JSON.parse(responseText);
          console.log("✅ JSON parseado:", data);
          
          toast({
            title: data.message || "Script Setlist.fm executado!",
            description: data.success 
              ? "O workflow foi concluído com sucesso." 
              : "O workflow foi iniciado.",
          });
        } catch (jsonError) {
          console.error("❌ Erro ao parsear JSON:", jsonError);
          console.log("Mostrando toast genérico...");
          toast({
            title: "Script Setlist.fm executado!",
            description: "O workflow foi concluído.",
          });
        }
      } else {
        throw new Error(`Falha na execução: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Erro ao executar:", error);
      toast({
        title: "Erro ao executar",
        description: "Não foi possível executar o script. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const executeDiscogs = async () => {
    try {
      console.log("🚀 Iniciando chamada para Discogs...");
      
      const response = await fetch("https://workers.wagnermetalcfc.workers.dev/discogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "lovable-app",
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("📡 Status da resposta:", response.status);
      console.log("📡 Headers:", Object.fromEntries(response.headers.entries()));
      
      // Pegar o texto bruto primeiro
      const responseText = await response.text();
      console.log("📄 Resposta bruta:", responseText);

      if (response.ok) {
        try {
          // Tentar parsear o JSON
          const data = JSON.parse(responseText);
          console.log("✅ JSON parseado:", data);
          
          toast({
            title: data.message || "Script Discogs executado!",
            description: data.success 
              ? "O workflow foi concluído com sucesso." 
              : "O workflow foi iniciado.",
          });
        } catch (jsonError) {
          console.error("❌ Erro ao parsear JSON:", jsonError);
          console.log("Mostrando toast genérico...");
          toast({
            title: "Script Discogs executado!",
            description: "O workflow foi concluído.",
          });
        }
      } else {
        throw new Error(`Falha na execução: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Erro ao executar:", error);
      toast({
        title: "Erro ao executar",
        description: "Não foi possível executar o script. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Automações</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Automações de Música
            </h2>
            <p className="text-muted-foreground text-lg">
              Execute scripts para extrair dados do Setlist.fm e Discogs automaticamente.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <WorkflowCard
              icon={<Music className="w-6 h-6" />}
              title="Setlist.fm Script"
              description="Extrai dados de setlists e informações de shows diretamente do Setlist.fm para sua coleção."
              buttonText="Executar Script"
              onExecute={executeSetlistFM}
              delay={100}
            />

            <WorkflowCard
              icon={<Disc3 className="w-6 h-6" />}
              title="Discogs Script"
              description="Busca informações detalhadas de discos, artistas e lançamentos no banco de dados do Discogs."
              buttonText="Executar Script"
              onExecute={executeDiscogs}
              delay={200}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
