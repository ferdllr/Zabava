export async function getAllLocals(): Promise<any[]> {
    try {
      const response = await fetch('http://localhost:4000/api/local/getAll');
      if (!response.ok) {
        throw new Error('Erro ao buscar locais');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
      throw error;
    }
  }
  