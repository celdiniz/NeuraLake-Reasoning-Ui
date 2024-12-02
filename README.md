# iSA-02 Interface - Open Source

Bem-vindo à interface oficial para o iSA-02, o primeiro **Small Reasoning Model (SRM)** do mundo. Esta interface foi projetada para facilitar o uso e a integração do modelo iSA-02 em diferentes aplicações de IA, aproveitando sua capacidade única de raciocínio lógico dinâmico com suporte a janelas de contexto de até **256K tokens**.

---
![IMG_1916](https://github.com/user-attachments/assets/3971bd4f-6986-4f36-a9d8-f6d8d48d84e9)
---

## 🌟 **Sobre o iSA-02**

O iSA-02 redefine os limites do raciocínio em IA:
- Desenvolvido a partir do **Llama 3.2 3B** com aprimoramento baseado em datasets sintéticos da **NeuraLake**.
- Capacidade de ajuste de raciocínio conforme a janela de contexto aumenta ou diminui.
- Disponível nos formatos **F16 (VLLM)** e **GGUF (Hugging Face)**.

Para mais detalhes técnicos sobre o iSA-02, visite nosso [artigo oficial](https://github.com/NeuraLake/isa-02).

---

## 🚀 **Recursos da Interface**

- **Configuração Simples:** Definição rápida para iniciar o uso do modelo.
- **Compatibilidade Ampla:** Suporte para integração com frameworks como Hugging Face e VLLM.
- **Monitoramento Avançado:** Logs detalhados para rastrear raciocínios em tempo real.
- **Modularidade:** Adapte a interface às suas necessidades específicas.

---

## 🛠️ **Instalação**

1. Clone este repositório:
   ```bash
   git clone https://github.com/NeuraLake/isa-02-interface.git
   cd isa-02-interface
   ```

2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure o ambiente:
   - Adicione o arquivo de configuração `config.yaml` para personalizar os parâmetros do modelo. 
   - **Exemplo básico de `config.yaml`:**
     ```yaml
     model_path: "path/to/isa-02"
     context_window: 256000
     logging: true
     ```
---

## 🧑‍💻 **Como Usar**

1. **Carregue o modelo:**
   ```python
   from isa02_interface import ISA02Interface

   model = ISA02Interface(model_path="path/to/isa-02")
   ```

2. **Execute um raciocínio:**
   ```python
   question = "Qual é a altura da Torre Eiffel?"
   response = model.reason(question)
   print(response)
   ```

3. **Personalize os parâmetros:**
   ```python
   response = model.reason(question, context_window=128000, verbose=True)
   ```

---

## 📚 **Documentação Completa**

Acesse nossa [documentação](https://github.com/NeuraLake/isa-02-interface/wiki) para guias detalhados, exemplos avançados e dicas de integração.

---

## 🧪 **Contribuição**

Contribuições são bem-vindas! Por favor, siga as etapas abaixo:
1. Faça um fork do repositório.
2. Crie um branch para sua funcionalidade: `git checkout -b feature/nova-funcionalidade`.
3. Envie um pull request para análise.

---

## 🛡️ **Licença**

Esta interface é open source sob a [Licença Apache 2.0](LICENSE).

---

## 📬 **Contato**

- Email: support@neuralake.com  
- LinkedIn: [NeuraLake](https://www.linkedin.com/company/neuralake)  
- Site oficial: [neuralake.com](https://neuralake.com)

---

**_We teach silicon and metal how to reasoning._**
