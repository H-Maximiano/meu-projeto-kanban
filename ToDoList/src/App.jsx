import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ContainerPricipal, DivCard, ContainerStatus } from './styles';

const API_URL = 'http://18.119.10.104:8080/api/tarefas';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefaNome, setNovaTarefaNome] = useState('');

  // 1. Declaração da função antes do uso
  const carregarTarefas = () => {
    axios.get(API_URL)
      .then(response => {
        setTarefas(response.data); 
      })
      .catch(error => {
        console.error("Erro ao buscar as tarefas:", error);
      });
  };

  // Busca as tarefas no Flask ao carregar a página
  useEffect(() => {
    carregarTarefas();
  }, []);

  // 2. Criar nova tarefa (POST)
  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (!novaTarefaNome.trim()) return;

    axios.post(API_URL, { name: novaTarefaNome })
      .then(response => {
        setTarefas([...tarefas, response.data]); // Adiciona na tela na hora
        setNovaTarefaNome(''); // Limpa o input
      })
      .catch(error => {
        console.error("Erro ao criar tarefa:", error);
      });
  };

  // 3. Deletar tarefa (DELETE)
  const deletarTarefa = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        // Remove do estado local para sumir da tela instantaneamente
        setTarefas(tarefas.filter(t => t.id !== id));
      })
      .catch(error => {
        console.error("Erro ao deletar tarefa:", error);
      });
  };

  // 4. Lógica executada quando você arrasta e solta um card
  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const novoStatus = destination.droppableId; 
    const tarefaId = parseInt(draggableId);

    setTarefas(prevTarefas =>
      prevTarefas.map(t =>
        t.id === tarefaId ? { ...t, status: novoStatus } : t
      )
    );

    axios.patch(`${API_URL}/${tarefaId}/status`, {
      status: novoStatus
    }).catch(error => {
      console.error("Erro ao atualizar status no Flask:", error);
    });
  };

  const colunas = [
    { id: 'pendente', titulo: 'Tarefas' },
    { id: 'executando', titulo: 'Em Execução' },
    { id: 'concluido', titulo: 'Terminado' }
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#1e293b', marginTop: '20px', fontFamily: 'sans-serif' }}>
        Quadro Kanban - Flask + React
      </h1>  

      {/* Formulário para adicionar nova tarefa */}
      <form onSubmit={adicionarTarefa} style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Digite uma nova tarefa..." 
          value={novaTarefaNome}
          onChange={(e) => setNovaTarefaNome(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Adicionar
        </button>
      </form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ContainerPricipal>
          {colunas.map(coluna => (
            <Droppable key={coluna.id} droppableId={coluna.id}>
              {(provided) => (
                <ContainerStatus
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{coluna.titulo}</h2>

                  {tarefas
                    .filter(tarefa => tarefa.status === coluna.id)
                    .map((tarefa, index) => (
                      <Draggable key={tarefa.id} draggableId={String(tarefa.id)} index={index}>
                        {(provided) => (
                          <DivCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <p>{tarefa.name}</p>

                            {/* Botão de excluir visível apenas na coluna 'concluido' */}
                            {coluna.id === 'concluido' && (
                              <button 
                                onClick={() => deletarTarefa(tarefa.id)}
                                style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}
                              >
                                🗑️
                              </button>
                            )}
                          </DivCard>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ContainerStatus>
              )}
            </Droppable>
          ))}
        </ContainerPricipal>
      </DragDropContext>
    </div>
  );
}

export default App;