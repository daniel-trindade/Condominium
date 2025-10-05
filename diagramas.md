# Diagramas de Atividade do Sistema do Condomínio

## 1. Controle de Entrada

```mermaid
graph TD
    classDef s_font font-size:12px;

    A[Início: Pessoa chega<br>na portaria] --> R{Entrega?};

    R -- Não --> B[Porteiro solicita<br>identificação];
    B --> C[Porteiro consulta<br>sistema];
    C --> D{Pessoa cadastrada?};
    D -- Sim --> E[Verifica infos<br>no sistema];
    E --> F{Infos conferem?};
    F -- Sim --> G((Acesso<br>Liberado));
    F -- Não --> H((Acesso<br>Negado));

    D -- Não --> J[Solicita autorização<br>do condômino];
    J --> K{Condômino<br>autoriza?};
    K -- Sim --> L[Cadastra visitante<br>no sistema];
    L --> G;
    K -- Não --> H;

    R -- Sim --> M[Porteiro registra entrega];
    M --> N[Identifica destinatário];
    N --> O[Registra remetente<br>e tipo de entrega];

    O --> P[Notifica condômino<br>por email ou ligação];
    P --> Q((Entrega<br>registrada));

    class A,B,C,D,E,F,G,H,J,K,L,M,N,O,P,Q,R s_font;
```

# 2. Reserva de Áreas Comuns

```mermaid
graph TD
    classDef s_font font-size:12px;

    A[Início: Condômino deseja<br>reservar área comum] --> B[Seleciona área: quadra,<br>salão de festas, piscina];
    B --> C[Consulta disponibilidade<br>no calendário];
    C --> D{Horário livre?};
    D -- Sim --> E[Escolhe data e horário];
    E --> F[Confirma reserva];
    F --> G{Condômino já tem <br> mais que 2 reservas?};
    G -- Não --> H((Reserva confirmada<br>no sistema));
    G -- Sim --> I((Exibe erro: limite<br>de reservas atingido));
    

    D -- Não --> J[Exibe horários disponíveis];
    J --> B;
    

    class A,B,C,D,E,F,G,H,I,J,K s_font;
```
