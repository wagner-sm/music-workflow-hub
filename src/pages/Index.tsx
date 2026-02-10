import { Music, Disc3, Download } from "lucide-react";
import { WorkflowCard } from "@/components/WorkflowCard";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [isLoadingSetlist, setIsLoadingSetlist] = useState(false);
  const [isLoadingDiscogs, setIsLoadingDiscogs] = useState(false);

  // Função para converter base64 em Blob e fazer download
  const downloadFile = (base64Data: string, filename: string) => {
    try {
      // Converter base64 para bytes
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      
      // Criar Blob
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      // Criar link temporário e fazer download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      return false;
    }
  };

  const executeSetlistFM = async () => {
    setIsLoadingSetlist(true);
    
    try {
      // ⚠️ SUBSTITUA PELA URL DO SEU WORKFLOW PIPEDREAM SETLIST.FM
      const PIPEDREAM_SETLISTFM_URL = "https://eo38jrf5vyolc3q.m.pipedream.net";
      
      const response = await fetch(PIPEDREAM_SETLISTFM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "lovable-app",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Mostrar notificação de sucesso
        toast({
          title: "✅ Script Setlist.fm executado!",
          description: `${result.total_shows || 0} shows processados com sucesso.`,
        });

        // Fazer download do arquivo se disponível
        if (result.file_base64) {
          const downloadSuccess = downloadFile(result.file_base64, result.filename);
          
          if (downloadSuccess) {
            toast({
              title: "📥 Download iniciado!",
              description: `Arquivo ${result.filename} baixado (${result.file_size_kb} KB)`,
            });
          } else {
            toast({
              title: "⚠️ Erro no download",
              description: "Arquivo gerado mas erro ao baixar. Verifique o console.",
              variant: "destructive",
            });
          }
        }
      } else {
        throw new Error(result.error || result.message || "Falha na execução");
      }
    } catch (error: any) {
      console.error("Erro Setlist.fm:", error);
      toast({
        title: "❌ Erro ao executar Setlist.fm",
        description: error.message || "Não foi possível executar o script. Verifique a configuração.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSetlist(false);
    }
  };

  const executeDiscogs = async () => {
    setIsLoadingDiscogs(true);
    
    try {
      // ⚠️ SUBSTITUA PELA URL DO SEU WORKFLOW PIPEDREAM DISCOGS
      const PIPEDREAM_DISCOGS_URL = "https://COLE_SUA_URL_AQUI.m.pipedream.net";
      
      const response = await fetch(PIPEDREAM_DISCOGS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "lovable-app",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Mostrar notificação de sucesso
        toast({
          title: "✅ Coleção Discogs exportada!",
          description: `${result.total_items || 0} itens processados com sucesso.`,
        });

        // Fazer download do arquivo se disponível
        if (result.file_base64) {
          const downloadSuccess = downloadFile(result.file_base64, result.filename);
          
          if (downloadSuccess) {
            toast({
              title: "📥 Download iniciado!",
              description: `Arquivo ${result.filename} baixado (${result.file_size_kb} KB)`,
            });
          } else {
            toast({
              title: "⚠️ Erro no download",
              description: "Arquivo gerado mas erro ao baixar. Verifique o console.",
              variant: "destructive",
            });
          }
        }
      } else {
        throw new Error(result.error || result.message || "Falha na execução");
      }
    } catch (error: any) {
      console.error("Erro Discogs:", error);
      toast({
        title: "❌ Erro ao exportar Discogs",
        description: error.message || "Não foi possível executar o script. Verifique a configuração.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDiscogs(false);
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
            <div>
              <h1 className="text-xl font-bold text-foreground">Automações</h1>
              <p className="text-xs text-muted-foreground">Powered by Pipedream • Download automático</p>
            </div>
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
            <p className="text-sm text-muted-foreground/60 mt-2 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Arquivos Excel baixados automaticamente
            </p>
          </div>

          {/* Workflow Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <WorkflowCard
              icon={<Music className="w-6 h-6" />}
              title="Setlist.fm Script"
              description="Extrai dados de setlists e informações de shows diretamente do Setlist.fm usando API oficial."
              buttonText={isLoadingSetlist ? "Processando..." : "Executar Script"}
              onExecute={executeSetlistFM}
              delay={100}
              disabled={isLoadingSetlist}
            />

            <WorkflowCard
              icon={<Disc3 className="w-6 h-6" />}
              title="Discogs Script"
              description="Exporta sua coleção completa do Discogs com informações detalhadas de discos, artistas e labels."
              buttonText={isLoadingDiscogs ? "Processando..." : "Executar Script"}
              onExecute={executeDiscogs}
              delay={200}
              disabled={isLoadingDiscogs}
            />
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid gap-4 md:grid-cols-2 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="p-4 rounded-lg border border-border/50 bg-card/30">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Status: Ativo
              </h3>
              <p className="text-xs text-muted-foreground">
                Workflows configurados e prontos para uso
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border/50 bg-card/30">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                100% Gratuito
              </h3>
              <p className="text-xs text-muted-foreground">
                Execuções ilimitadas via Pipedream
              </p>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-6 rounded-lg border border-border/50 bg-card/20 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              ℹ️ Como funciona?
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Os scripts são executados na nuvem via Pipedream</li>
              <li>• Dados são coletados via APIs oficiais (Setlist.fm e Discogs)</li>
              <li>• Arquivos Excel são gerados automaticamente com estatísticas</li>
              <li>• <strong>Download automático</strong> inicia assim que o processamento termina</li>
              <li>• Processo leva entre 10-30 segundos dependendo da quantidade de dados</li>
            </ul>
          </div>

          {/* Download Notice */}
          <div className="mt-6 p-4 rounded-lg border border-blue-500/30 bg-blue-500/5 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-blue-500 mb-1">Download Automático</h4>
                <p className="text-xs text-muted-foreground">
                  Os arquivos Excel serão baixados automaticamente após o processamento. 
                  Certifique-se de permitir downloads no seu navegador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-xs text-muted-foreground">
            Migrado de n8n para Pipedream • Sem servidor próprio • Download automático de arquivos
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
