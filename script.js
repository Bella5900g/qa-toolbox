// QA-Toolbox - Script Principal
// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ABA 1: TEXTO - Contadores
    // ============================================
    const textInputCounters = document.getElementById('textInputCounters');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const byteCount = document.getElementById('byteCount');

    function atualizarContadores() {
        const texto = textInputCounters.value;
        
        // Contagem de caracteres
        const caracteres = texto.length;
        charCount.textContent = `Caracteres: ${caracteres}`;
        
        // Contagem de palavras (remove espaços extras e divide por espaços)
        const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
        wordCount.textContent = `Palavras: ${palavras}`;
        
        // Contagem de linhas
        const linhas = texto === '' ? 0 : texto.split('\n').length;
        lineCount.textContent = `Linhas: ${linhas}`;
        
        // Contagem de bytes (usando TextEncoder para UTF-8)
        const encoder = new TextEncoder();
        const bytes = encoder.encode(texto).length;
        byteCount.textContent = `Bytes: ${bytes}`;
    }

    // Atualiza contadores em tempo real
    textInputCounters.addEventListener('input', atualizarContadores);

    // ============================================
    // ABA 1: TEXTO - Conversores de Case
    // ============================================
    const textInputCase = document.getElementById('textInputCase');
    const btnUppercase = document.getElementById('btnUppercase');
    const btnLowercase = document.getElementById('btnLowercase');
    const btnTitlecase = document.getElementById('btnTitlecase');
    const btnCopyText = document.getElementById('btnCopyText');
    const btnClearText = document.getElementById('btnClearText');

    // Converte para MAIÚSCULAS
    btnUppercase.addEventListener('click', function() {
        textInputCase.value = textInputCase.value.toUpperCase();
    });

    // Converte para minúsculas
    btnLowercase.addEventListener('click', function() {
        textInputCase.value = textInputCase.value.toLowerCase();
    });

    // Converte para Primeira Letra Maiúscula (Title Case)
    btnTitlecase.addEventListener('click', function() {
        const texto = textInputCase.value.toLowerCase();
        const textoFormatado = texto.replace(/\b\w/g, function(letra) {
            return letra.toUpperCase();
        });
        textInputCase.value = textoFormatado;
    });

    // Copiar texto
    btnCopyText.addEventListener('click', function() {
        textInputCase.select();
        document.execCommand('copy');
        
        // Feedback visual
        const textoOriginal = btnCopyText.textContent;
        btnCopyText.textContent = 'Copiado!';
        btnCopyText.classList.add('btn-success');
        btnCopyText.classList.remove('btn-secondary');
        
        setTimeout(function() {
            btnCopyText.textContent = textoOriginal;
            btnCopyText.classList.remove('btn-success');
            btnCopyText.classList.add('btn-secondary');
        }, 1500);
    });

    // Limpar texto
    btnClearText.addEventListener('click', function() {
        textInputCase.value = '';
    });

    // ============================================
    // ABA 2: ENCODERS/DECODERS - Base64
    // ============================================
    const base64Input = document.getElementById('base64Input');
    const base64Output = document.getElementById('base64Output');
    const btnBase64Encode = document.getElementById('btnBase64Encode');
    const btnBase64Decode = document.getElementById('btnBase64Decode');
    const btnBase64Swap = document.getElementById('btnBase64Swap');

    // Encode Base64
    btnBase64Encode.addEventListener('click', function() {
        try {
            const texto = base64Input.value;
            const codificado = btoa(unescape(encodeURIComponent(texto)));
            base64Output.value = codificado;
        } catch (erro) {
            alert('Erro ao codificar: ' + erro.message);
        }
    });

    // Decode Base64
    btnBase64Decode.addEventListener('click', function() {
        try {
            const codificado = base64Input.value.trim();
            const decodificado = decodeURIComponent(escape(atob(codificado)));
            base64Output.value = decodificado;
        } catch (erro) {
            alert('Erro ao decodificar. Verifique se o texto é um Base64 válido.');
        }
    });

    // Trocar (Swap) campos Base64
    btnBase64Swap.addEventListener('click', function() {
        const temp = base64Input.value;
        base64Input.value = base64Output.value;
        base64Output.value = temp;
    });

    // ============================================
    // ABA 2: ENCODERS/DECODERS - URL
    // ============================================
    const urlInput = document.getElementById('urlInput');
    const urlOutput = document.getElementById('urlOutput');
    const btnUrlEncode = document.getElementById('btnUrlEncode');
    const btnUrlDecode = document.getElementById('btnUrlDecode');

    // Encode URL
    btnUrlEncode.addEventListener('click', function() {
        try {
            const texto = urlInput.value;
            const codificado = encodeURIComponent(texto);
            urlOutput.value = codificado;
        } catch (erro) {
            alert('Erro ao codificar: ' + erro.message);
        }
    });

    // Decode URL
    btnUrlDecode.addEventListener('click', function() {
        try {
            const codificado = urlInput.value;
            const decodificado = decodeURIComponent(codificado);
            urlOutput.value = decodificado;
        } catch (erro) {
            alert('Erro ao decodificar. Verifique se o texto é uma URL codificada válida.');
        }
    });

    // ============================================
    // ABA 3: FORMATADORES - JSON
    // ============================================
    const jsonInput = document.getElementById('jsonInput');
    const btnJsonPrettify = document.getElementById('btnJsonPrettify');
    const btnJsonMinify = document.getElementById('btnJsonMinify');
    const btnJsonCopy = document.getElementById('btnJsonCopy');
    const btnJsonClear = document.getElementById('btnJsonClear');
    const jsonAlertContainer = document.getElementById('jsonAlertContainer');

    function mostrarAlertaJson(mensagem) {
        jsonAlertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${mensagem}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Remove o alerta após 5 segundos
        setTimeout(function() {
            const alerta = jsonAlertContainer.querySelector('.alert');
            if (alerta) {
                alerta.remove();
            }
        }, 5000);
    }

    // Prettify / Formatar JSON
    btnJsonPrettify.addEventListener('click', function() {
        try {
            const jsonTexto = jsonInput.value.trim();
            if (jsonTexto === '') {
                mostrarAlertaJson('Por favor, insira um JSON válido.');
                return;
            }
            
            const objetoJson = JSON.parse(jsonTexto);
            const jsonFormatado = JSON.stringify(objetoJson, null, 2);
            jsonInput.value = jsonFormatado;
            
            // Remove alertas anteriores se houver
            jsonAlertContainer.innerHTML = '';
        } catch (erro) {
            mostrarAlertaJson('JSON inválido! Verifique a sintaxe do JSON.');
        }
    });

    // Minify / Compactar JSON
    btnJsonMinify.addEventListener('click', function() {
        try {
            const jsonTexto = jsonInput.value.trim();
            if (jsonTexto === '') {
                mostrarAlertaJson('Por favor, insira um JSON válido.');
                return;
            }
            
            const objetoJson = JSON.parse(jsonTexto);
            const jsonCompactado = JSON.stringify(objetoJson);
            jsonInput.value = jsonCompactado;
            
            // Remove alertas anteriores se houver
            jsonAlertContainer.innerHTML = '';
        } catch (erro) {
            mostrarAlertaJson('JSON inválido! Verifique a sintaxe do JSON.');
        }
    });

    // Copiar JSON
    btnJsonCopy.addEventListener('click', function() {
        jsonInput.select();
        document.execCommand('copy');
        
        // Feedback visual
        const textoOriginal = btnJsonCopy.textContent;
        btnJsonCopy.textContent = 'Copiado!';
        btnJsonCopy.classList.add('btn-success');
        btnJsonCopy.classList.remove('btn-secondary');
        
        setTimeout(function() {
            btnJsonCopy.textContent = textoOriginal;
            btnJsonCopy.classList.remove('btn-success');
            btnJsonCopy.classList.add('btn-secondary');
        }, 1500);
    });

    // Limpar JSON
    btnJsonClear.addEventListener('click', function() {
        jsonInput.value = '';
        jsonAlertContainer.innerHTML = '';
    });

    // ============================================
    // ABA 4: GERADORES DE DADOS - CPF
    // ============================================
    const cpfOutput = document.getElementById('cpfOutput');
    const btnGenerateCpf = document.getElementById('btnGenerateCpf');
    const btnCopyCpf = document.getElementById('btnCopyCpf');

    // Função para calcular dígito verificador do CPF
    function calcularDigitoCPF(cpf, posicao) {
        let soma = 0;
        let peso = posicao + 1;
        
        for (let i = 0; i < posicao; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    // Função para gerar CPF válido
    function generateCPF() {
        // Gera 9 dígitos aleatórios
        let cpf = '';
        for (let i = 0; i < 9; i++) {
            cpf += Math.floor(Math.random() * 10).toString();
        }
        
        // Calcula primeiro dígito verificador
        const digito1 = calcularDigitoCPF(cpf, 9);
        cpf += digito1.toString();
        
        // Calcula segundo dígito verificador
        const digito2 = calcularDigitoCPF(cpf, 10);
        cpf += digito2.toString();
        
        // Aplica máscara XXX.XXX.XXX-XX
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Gerar CPF
    btnGenerateCpf.addEventListener('click', function() {
        cpfOutput.value = generateCPF();
    });

    // Copiar CPF
    btnCopyCpf.addEventListener('click', function() {
        if (cpfOutput.value) {
            cpfOutput.select();
            document.execCommand('copy');
            
            // Feedback visual
            const textoOriginal = btnCopyCpf.textContent;
            btnCopyCpf.textContent = 'Copiado!';
            btnCopyCpf.classList.add('btn-success');
            btnCopyCpf.classList.remove('btn-outline-secondary');
            
            setTimeout(function() {
                btnCopyCpf.textContent = textoOriginal;
                btnCopyCpf.classList.remove('btn-success');
                btnCopyCpf.classList.add('btn-outline-secondary');
            }, 1500);
        }
    });

    // ============================================
    // ABA 4: GERADORES DE DADOS - CNPJ
    // ============================================
    const cnpjOutput = document.getElementById('cnpjOutput');
    const btnGenerateCnpj = document.getElementById('btnGenerateCnpj');
    const btnCopyCnpj = document.getElementById('btnCopyCnpj');

    // Função para calcular dígito verificador do CNPJ
    function calcularDigitoCNPJ(cnpj, posicao) {
        const pesos = posicao === 12 
            ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        
        let soma = 0;
        for (let i = 0; i < posicao; i++) {
            soma += parseInt(cnpj[i]) * pesos[i];
        }
        
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    // Função para gerar CNPJ válido
    function generateCNPJ() {
        // Gera 12 dígitos aleatórios
        let cnpj = '';
        for (let i = 0; i < 12; i++) {
            cnpj += Math.floor(Math.random() * 10).toString();
        }
        
        // Calcula primeiro dígito verificador
        const digito1 = calcularDigitoCNPJ(cnpj, 12);
        cnpj += digito1.toString();
        
        // Calcula segundo dígito verificador
        const digito2 = calcularDigitoCNPJ(cnpj, 13);
        cnpj += digito2.toString();
        
        // Aplica máscara XX.XXX.XXX/XXXX-XX
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    // Gerar CNPJ
    btnGenerateCnpj.addEventListener('click', function() {
        cnpjOutput.value = generateCNPJ();
    });

    // Copiar CNPJ
    btnCopyCnpj.addEventListener('click', function() {
        if (cnpjOutput.value) {
            cnpjOutput.select();
            document.execCommand('copy');
            
            // Feedback visual
            const textoOriginal = btnCopyCnpj.textContent;
            btnCopyCnpj.textContent = 'Copiado!';
            btnCopyCnpj.classList.add('btn-success');
            btnCopyCnpj.classList.remove('btn-outline-secondary');
            
            setTimeout(function() {
                btnCopyCnpj.textContent = textoOriginal;
                btnCopyCnpj.classList.remove('btn-success');
                btnCopyCnpj.classList.add('btn-outline-secondary');
            }, 1500);
        }
    });

    // ============================================
    // ABA 4: GERADORES DE DADOS EXPANDIDOS
    // ============================================
    
    // Gerador Email
    const emailOutput = document.getElementById('emailOutput');
    const btnGenerateEmail = document.getElementById('btnGenerateEmail');
    const btnCopyEmail = document.getElementById('btnCopyEmail');

    function generateEmail() {
        const nomes = ['usuario', 'teste', 'admin', 'cliente', 'vendedor', 'suporte', 'dev', 'qa'];
        const dominios = ['gmail.com', 'hotmail.com', 'yahoo.com', 'exemplo.com', 'teste.com.br', 'empresa.com'];
        const nome = nomes[Math.floor(Math.random() * nomes.length)];
        const numero = Math.floor(Math.random() * 9999);
        const dominio = dominios[Math.floor(Math.random() * dominios.length)];
        return `${nome}${numero}@${dominio}`;
    }

    btnGenerateEmail.addEventListener('click', function() {
        emailOutput.value = generateEmail();
    });

    btnCopyEmail.addEventListener('click', function() {
        if (emailOutput.value) {
            emailOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyEmail);
        }
    });

    // Gerador Telefone
    const telefoneOutput = document.getElementById('telefoneOutput');
    const btnGenerateTelefone = document.getElementById('btnGenerateTelefone');
    const btnCopyTelefone = document.getElementById('btnCopyTelefone');

    function generateTelefone() {
        const ddd = Math.floor(Math.random() * 90) + 10; // DDD entre 10 e 99
        const numero = Math.floor(Math.random() * 90000000) + 10000000; // 8 dígitos
        return `(${ddd}) ${numero.toString().substring(0, 5)}-${numero.toString().substring(5)}`;
    }

    btnGenerateTelefone.addEventListener('click', function() {
        telefoneOutput.value = generateTelefone();
    });

    btnCopyTelefone.addEventListener('click', function() {
        if (telefoneOutput.value) {
            telefoneOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyTelefone);
        }
    });

    // Gerador Data/Hora
    const dataOutput = document.getElementById('dataOutput');
    const btnGenerateDataBR = document.getElementById('btnGenerateDataBR');
    const btnGenerateDataISO = document.getElementById('btnGenerateDataISO');
    const btnConvertTimeStampBR = document.getElementById('btnConvertTimeStampBR');
    const btnGenerateTimestamp = document.getElementById('btnGenerateTimestamp');
    const btnCopyData = document.getElementById('btnCopyData');

    btnGenerateDataBR.addEventListener('click', function() {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');
        dataOutput.value = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    });

    btnGenerateDataISO.addEventListener('click', function() {
        const data = new Date();
        dataOutput.value = data.toISOString();
    });
    btnConvertTimeStampBR.addEventListener('click', function() {
        const timestamp = parseInt(document.getElementById('dataInput').value);
        if (isNaN(timestamp)) {
            alert('Por favor, insira um timestamp válido.');
            return;
        }
        const data = new Date(timestamp * 1000);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');
        dataOutput.value = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    });
    btnGenerateTimestamp.addEventListener('click', function() {
        dataOutput.value = Math.floor(Date.now() / 1000).toString();
    });


    btnCopyData.addEventListener('click', function() {
        if (dataOutput.value) {
            dataOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyData);
        }
    });

    // Gerador UUID
    const uuidOutput = document.getElementById('uuidOutput');
    const btnGenerateUuid = document.getElementById('btnGenerateUuid');
    const btnCopyUuid = document.getElementById('btnCopyUuid');

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    btnGenerateUuid.addEventListener('click', function() {
        uuidOutput.value = generateUUID();
    });

    btnCopyUuid.addEventListener('click', function() {
        if (uuidOutput.value) {
            uuidOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyUuid);
        }
    });

    // Gerador CEP
    const cepOutput = document.getElementById('cepOutput');
    const btnGenerateCep = document.getElementById('btnGenerateCep');
    const btnCopyCep = document.getElementById('btnCopyCep');

    function generateCEP() {
        const cep = Math.floor(Math.random() * 90000000) + 10000000; // 8 dígitos
        return cep.toString().replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    btnGenerateCep.addEventListener('click', function() {
        cepOutput.value = generateCEP();
    });

    btnCopyCep.addEventListener('click', function() {
        if (cepOutput.value) {
            cepOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyCep);
        }
    });

    // Gerador Nome Completo
    const nomeOutput = document.getElementById('nomeOutput');
    const btnGenerateNome = document.getElementById('btnGenerateNome');
    const btnCopyNome = document.getElementById('btnCopyNome');

    const primeirosNomes = ['Maria', 'João', 'Ana', 'Pedro', 'Julia', 'Carlos', 'Fernanda', 'Ricardo', 'Patricia', 'Lucas'];
    const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima'];

    function generateNome() {
        const primeiroNome = primeirosNomes[Math.floor(Math.random() * primeirosNomes.length)];
        const sobrenome1 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
        const sobrenome2 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
        return `${primeiroNome} ${sobrenome1} ${sobrenome2}`;
    }

    btnGenerateNome.addEventListener('click', function() {
        nomeOutput.value = generateNome();
    });

    btnCopyNome.addEventListener('click', function() {
        if (nomeOutput.value) {
            nomeOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyNome);
        }
    });

    // Função auxiliar para feedback de copiar
    function mostrarFeedbackCopiar(botao) {
        const textoOriginal = botao.textContent;
        botao.textContent = 'Copiado!';
        botao.classList.add('btn-success');
        botao.classList.remove('btn-outline-secondary');
        
        setTimeout(function() {
            botao.textContent = textoOriginal;
            botao.classList.remove('btn-success');
            botao.classList.add('btn-outline-secondary');
        }, 1500);
    }

    // ============================================
    // ABA 5: COMPARADOR DE TEXTOS/JSON
    // ============================================
    const comparadorTexto1 = document.getElementById('comparadorTexto1');
    const comparadorTexto2 = document.getElementById('comparadorTexto2');
    const btnComparar = document.getElementById('btnComparar');
    const btnLimparComparador = document.getElementById('btnLimparComparador');
    const comparadorResultado = document.getElementById('comparadorResultado');

    function compararTextos(texto1, texto2) {
        const linhas1 = texto1.split('\n');
        const linhas2 = texto2.split('\n');
        const maxLinhas = Math.max(linhas1.length, linhas2.length);
        
        let html = '<div class="card"><div class="card-body"><h5 class="card-title">Resultado da Comparação</h5>';
        html += '<div class="table-responsive"><table class="table table-sm table-bordered">';
        html += '<thead><tr><th style="width: 5%">Linha</th><th style="width: 47.5%">Texto 1</th><th style="width: 47.5%">Texto 2</th></tr></thead><tbody>';
        
        let diferencas = 0;
        for (let i = 0; i < maxLinhas; i++) {
            const linha1 = linhas1[i] || '';
            const linha2 = linhas2[i] || '';
            const saoIguais = linha1 === linha2;
            
            if (!saoIguais) {
                diferencas++;
            }
            
            const classeLinha = saoIguais ? '' : 'table-warning';
            html += `<tr class="${classeLinha}">`;
            html += `<td>${i + 1}</td>`;
            html += `<td><code class="${saoIguais ? '' : 'text-danger'}">${escapeHtml(linha1)}</code></td>`;
            html += `<td><code class="${saoIguais ? '' : 'text-danger'}">${escapeHtml(linha2)}</code></td>`;
            html += '</tr>';
        }
        
        html += '</tbody></table></div>';
        
        if (diferencas === 0) {
            html += '<div class="alert alert-success mt-3">✓ Os textos são idênticos!</div>';
        } else {
            html += `<div class="alert alert-warning mt-3">⚠ Foram encontradas ${diferencas} linha(s) diferente(s).</div>`;
        }
        
        html += '</div></div>';
        return html;
    }

    function escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    btnComparar.addEventListener('click', function() {
        const texto1 = comparadorTexto1.value;
        const texto2 = comparadorTexto2.value;
        
        if (!texto1 && !texto2) {
            comparadorResultado.innerHTML = '<div class="alert alert-info">Por favor, insira textos para comparar.</div>';
            return;
        }
        
        comparadorResultado.innerHTML = compararTextos(texto1, texto2);
    });

    btnLimparComparador.addEventListener('click', function() {
        comparadorTexto1.value = '';
        comparadorTexto2.value = '';
        comparadorResultado.innerHTML = '';
    });

    // ============================================
    // ABA 6: JWT DECODER
    // ============================================
    const jwtInput = document.getElementById('jwtInput');
    const btnDecodificarJwt = document.getElementById('btnDecodificarJwt');
    const jwtResultado = document.getElementById('jwtResultado');

    function base64UrlDecode(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        if (pad) {
            base64 += new Array(5 - pad).join('=');
        }
        try {
            return decodeURIComponent(escape(atob(base64)));
        } catch (e) {
            return null;
        }
    }

    btnDecodificarJwt.addEventListener('click', function() {
        const token = jwtInput.value.trim();
        
        if (!token) {
            jwtResultado.innerHTML = '<div class="alert alert-warning">Por favor, insira um token JWT.</div>';
            return;
        }
        
        const partes = token.split('.');
        if (partes.length !== 3) {
            jwtResultado.innerHTML = '<div class="alert alert-danger">Token JWT inválido. Um JWT deve ter 3 partes separadas por ponto.</div>';
            return;
        }
        
        try {
            const header = base64UrlDecode(partes[0]);
            const payload = base64UrlDecode(partes[1]);
            const signature = partes[2];
            
            if (!header || !payload) {
                jwtResultado.innerHTML = '<div class="alert alert-danger">Erro ao decodificar o token JWT.</div>';
                return;
            }
            
            let html = '<div class="card"><div class="card-body">';
            html += '<h5 class="card-title">Token JWT Decodificado</h5>';
            
            // Header
            html += '<div class="mb-3"><h6>Header:</h6>';
            html += '<pre class="bg-light p-3 rounded"><code>' + escapeHtml(JSON.stringify(JSON.parse(header), null, 2)) + '</code></pre></div>';
            
            // Payload
            html += '<div class="mb-3"><h6>Payload:</h6>';
            const payloadObj = JSON.parse(payload);
            html += '<pre class="bg-light p-3 rounded"><code>' + escapeHtml(JSON.stringify(payloadObj, null, 2)) + '</code></pre></div>';
            
            // Verificar expiração
            if (payloadObj.exp) {
                const expDate = new Date(payloadObj.exp * 1000);
                const agora = new Date();
                const expirado = agora > expDate;
                html += `<div class="alert ${expirado ? 'alert-danger' : 'alert-success'}">`;
                html += `Token ${expirado ? 'EXPIRADO' : 'VÁLIDO'} - Expira em: ${expDate.toLocaleString('pt-BR')}`;
                html += '</div>';
            }
            
            // Signature (apenas mostrar que existe)
            html += '<div class="mb-3"><h6>Signature:</h6>';
            html += '<pre class="bg-light p-3 rounded"><code>' + signature.substring(0, 50) + '...</code></pre></div>';
            
            html += '</div></div>';
            jwtResultado.innerHTML = html;
        } catch (erro) {
            jwtResultado.innerHTML = '<div class="alert alert-danger">Erro ao processar o token JWT: ' + erro.message + '</div>';
        }
    });

    // ============================================
    // ABA 6: HASH GENERATOR
    // ============================================
    const hashInput = document.getElementById('hashInput');
    const hashOutput = document.getElementById('hashOutput');
    const btnHashMD5 = document.getElementById('btnHashMD5');
    const btnHashSHA256 = document.getElementById('btnHashSHA256');
    const btnHashSHA512 = document.getElementById('btnHashSHA512');
    const btnCopyHash = document.getElementById('btnCopyHash');

    // MD5 usando Crypto-JS (biblioteca externa via CDN)
    async function gerarHashMD5(texto) {
        if (typeof CryptoJS !== 'undefined') {
            return CryptoJS.MD5(texto).toString();
        } else {
            return 'Erro: Biblioteca Crypto-JS não carregada.';
        }
    }

    async function gerarHashSHA256(texto) {
        const encoder = new TextEncoder();
        const data = encoder.encode(texto);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function gerarHashSHA512(texto) {
        const encoder = new TextEncoder();
        const data = encoder.encode(texto);
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    btnHashMD5.addEventListener('click', async function() {
        const texto = hashInput.value;
        if (!texto) {
            hashOutput.value = 'Por favor, insira um texto para gerar o hash.';
            return;
        }
        hashOutput.value = await gerarHashMD5(texto);
    });

    btnHashSHA256.addEventListener('click', async function() {
        const texto = hashInput.value;
        if (!texto) {
            hashOutput.value = 'Por favor, insira um texto para gerar o hash.';
            return;
        }
        hashOutput.value = await gerarHashSHA256(texto);
    });

    btnHashSHA512.addEventListener('click', async function() {
        const texto = hashInput.value;
        if (!texto) {
            hashOutput.value = 'Por favor, insira um texto para gerar o hash.';
            return;
        }
        hashOutput.value = await gerarHashSHA512(texto);
    });

    btnCopyHash.addEventListener('click', function() {
        if (hashOutput.value) {
            hashOutput.select();
            document.execCommand('copy');
            mostrarFeedbackCopiar(btnCopyHash);
        }
    });

    // ============================================
    // ABA 7: REGEX TESTER
    // ============================================
    const regexPattern = document.getElementById('regexPattern');
    const regexTestText = document.getElementById('regexTestText');
    const regexFlagG = document.getElementById('regexFlagG');
    const regexFlagI = document.getElementById('regexFlagI');
    const regexFlagM = document.getElementById('regexFlagM');
    const btnTestarRegex = document.getElementById('btnTestarRegex');
    const regexResultado = document.getElementById('regexResultado');

    btnTestarRegex.addEventListener('click', function() {
        const pattern = regexPattern.value.trim();
        const texto = regexTestText.value;
        
        if (!pattern) {
            regexResultado.innerHTML = '<div class="alert alert-warning">Por favor, insira uma expressão regular.</div>';
            return;
        }
        
        try {
            // Construir flags
            let flags = '';
            if (regexFlagG.checked) flags += 'g';
            if (regexFlagI.checked) flags += 'i';
            if (regexFlagM.checked) flags += 'm';
            
            const regex = new RegExp(pattern, flags);
            const matches = texto.match(regex);
            const todasMatches = [];
            let match;
            const regexGlobal = new RegExp(pattern, flags + 'g');
            
            // Resetar regex para buscar todas as ocorrências
            regexGlobal.lastIndex = 0;
            while ((match = regexGlobal.exec(texto)) !== null) {
                todasMatches.push({
                    texto: match[0],
                    index: match.index,
                    grupos: match.slice(1)
                });
            }
            
            let html = '<div class="card"><div class="card-body">';
            html += '<h5 class="card-title">Resultado do Teste Regex</h5>';
            
            if (todasMatches.length === 0) {
                let dica = '';
                // Verificar se a regex usa âncoras de início/fim
                if (pattern.startsWith('^') || pattern.endsWith('$')) {
                    dica = '<div class="alert alert-info mt-2"><small><strong>💡 Dica:</strong> Sua regex usa âncoras <code>^</code> (início) ou <code>$</code> (fim). Isso significa que ela só encontra correspondências quando o padrão é a string inteira. Para encontrar padrões no meio do texto, remova essas âncoras.</small></div>';
                }
                html += '<div class="alert alert-warning">Nenhuma correspondência encontrada.</div>' + dica;
            } else {
                html += `<div class="alert alert-success">Encontradas ${todasMatches.length} correspondência(s).</div>`;
                html += '<div class="table-responsive"><table class="table table-sm table-bordered">';
                html += '<thead><tr><th>#</th><th>Correspondência</th><th>Posição</th><th>Grupos</th></tr></thead><tbody>';
                
                todasMatches.forEach((match, index) => {
                    html += '<tr>';
                    html += `<td>${index + 1}</td>`;
                    html += `<td><code>${escapeHtml(match.texto)}</code></td>`;
                    html += `<td>${match.index}</td>`;
                    html += `<td>${match.grupos.length > 0 ? match.grupos.map((g, i) => `Grupo ${i + 1}: <code>${escapeHtml(g || '')}</code>`).join('<br>') : '-'}</td>`;
                    html += '</tr>';
                });
                
                html += '</tbody></table></div>';
                
                // Mostrar texto com highlights
                let textoHighlight = escapeHtml(texto);
                todasMatches.reverse().forEach(match => {
                    const inicio = match.index;
                    const fim = inicio + match.texto.length;
                    textoHighlight = textoHighlight.substring(0, inicio) + 
                                   '<mark>' + textoHighlight.substring(inicio, fim) + '</mark>' + 
                                   textoHighlight.substring(fim);
                });
                
                html += '<div class="mt-3"><h6>Texto com correspondências destacadas:</h6>';
                html += `<div class="bg-light p-3 rounded"><pre style="white-space: pre-wrap; word-wrap: break-word;">${textoHighlight}</pre></div></div>`;
            }
            
            html += '</div></div>';
            regexResultado.innerHTML = html;
        } catch (erro) {
            regexResultado.innerHTML = '<div class="alert alert-danger">Erro na expressão regular: ' + escapeHtml(erro.message) + '</div>';
        }
    });

});

