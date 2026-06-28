import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Server, AlertTriangle, CheckCircle } from 'lucide-react';

export default function App() {
  // --- CONCEITO: useState (O Estado do Componente) ---
  // No React, variáveis normais não atualizam a tela. Precisamos do useState.
  // Ele nos dá a variável (logs) e uma função para atualizar essa variável (setLogs).
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState({ requests: 0, cpu: 12, status: 'Online' });
  const [chartData, setChartData] = useState([]);

  // --- CONCEITO: useEffect (Efeitos Colaterais / Ciclo de Vida) ---
  // Executa código automaticamente quando o componente aparece na tela.
  // Usaremos para simular uma API enviando dados em tempo real (como se fosse um WebSocket).
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const newRequestCount = Math.floor(Math.random() * 100) + 20;
      const cpuUsage = Math.floor(Math.random() * 40) + 20;
      
      // 1. Atualiza o Gráfico
      setChartData(prevData => {
        const updated = [...prevData, { time: now, requests: newRequestCount }];
        if (updated.length > 7) updated.shift(); // Mantém apenas os últimos 7 pontos
        return updated;
      });

      // 2. Atualiza as Métricas do Topo
      setMetrics({
        requests: newRequestCount,
        cpu: cpuUsage,
        status: cpuUsage > 55 ? 'Sob Carga' : 'Estável'
      });

      // 3. Gera um log simulado
      const statusOptions = ['200 OK', '200 OK', '200 OK', '500 Internal Error', '404 Not Found'];
      const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const newLog = {
        id: Math.random(),
        time: now,
        endpoint: `/api/v1/users/${Math.floor(Math.random() * 100)}`,
        status: randomStatus
      };

      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 4)]); // Mantém os 5 últimos logs
    }, 2000); // Executa a cada 2 segundos

    return () => clearInterval(interval); // Cleanup ao destruir o componente (boa prática)
  }, []);

  // --- O RETORNO DA FUNÇÃO: O JSX (HTML misturado com JS) ---
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{ marginBottom: '32px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '28px', margin: 0 }}>
          <Activity color="#38bdf8" size={32} /> SysMonitor Dashboard
        </h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0 0' }}>Monitoramento de microsserviços em tempo real</p>
      </header>

      {/* Grid de Cards de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1: Requisições */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span>Requisições / seg</span>
            <Server size={20} />
          </div>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0 0 0' }}>{metrics.requests} rps</p>
        </div>

        {/* Card 2: Uso de CPU */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span>Uso de CPU</span>
            <Activity size={20} />
          </div>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0 0 0', color: metrics.cpu > 50 ? '#f43f5e' : '#f8fafc' }}>
            {metrics.cpu}%
          </p>
        </div>

        {/* Card 3: Status do Sistema */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span>Status do Sistema</span>
            {metrics.status === 'Estável' ? <CheckCircle size={20} color="#22c55e" /> : <AlertTriangle size={20} color="#eab308" />}
          </div>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0 0 0' }}>{metrics.status}</p>
        </div>

      </div>

      {/* Seção Inferior: Gráfico + Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', breakup: 'medium' }}>
        
        {/* Gráfico */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Vazão de Tráfego (Últimos segundos)</h2>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                <Line type="monotone" dataKey="requests" stroke="#38bdf8" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Console de Logs Ao Vivo */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Live HTTP Logs</h2>
          <div style={{ fontFamily: 'monospace', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
            {logs.length === 0 ? (
              <p style={{ color: '#64748b' }}>Aguardando tráfego...</p>
            ) : (
              logs.map(log => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', borderRadius: '4px', backgroundColor: '#0f172a' }}>
                  <span style={{ color: '#64748b' }}>[{log.time}]</span>
                  <span style={{ color: '#e2e8f0' }}>{log.endpoint}</span>
                  <span style={{ color: log.status.includes('200') ? '#22c55e' : '#f43f5e', fontWeight: 'bold' }}>
                    {log.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}