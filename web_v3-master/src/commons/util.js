import nookies from 'nookies';
import useSWR from 'swr';
import fetch from 'unfetch'
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
const dot = require('dot-object');

//Metodo para acessar a chave de um obj via string
Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

//Função para criar um obj com nested obj apartir de uma string com separadores de .
const stringToObject = (weirdObject, s = '.') => Object.keys(weirdObject).reduce((acc, cur) => {
    const [parent, child] = cur.split(s);
    if (!acc[parent]) acc[parent] = {};
    acc[parent][child] = weirdObject[cur];
    return acc;
}, {});
//FUNÇÕES UTILITARIAS
//UTILITY FUNCTIONS

// Função para validação de acesso no sistema
// Function to validate the access in the system 
export function sessionValidate({
    ctx,
    externPaths = [],
    homePath = '',
    initialPath = ''

}) {
    try {
        if (externPaths.includes(ctx.pathname) && nookies.get(ctx).authorization) {
            ctx.res.writeHead(302, {
                Location: homePath
            })
            ctx.res.end()
        } else
            if (!externPaths.includes(ctx.pathname) && !nookies.get(ctx).authorization) {
                ctx.res.writeHead(302, {
                    Location: initialPath
                })
                ctx.res.end()
            }
    } catch (error) {
        console.log(error);
    }
}

// Função para salvar os ultimos usuários que realizaram o login no sistema
// Funtion to save the lastest users who logged in the system
export function recentLogin(user_id) {
    let recentLogin = localStorage.getItem("recentLogin");


    if (recentLogin) {
        recentLogin = JSON.parse(recentLogin);
        localStorage.setItem("recentLogin", JSON.stringify([
            ...recentLogin,
            user_id
        ]));
    } else {
        localStorage.setItem("recentLogin", JSON.stringify([user_id]));
    }
}

// Client HTTP feito em hooks - (https://github.com/zeit/swr)
// Client HTTP build in hooks - (https://github.com/zeit/swr)
// Requisição genérica para APIs
// Generic Request for APIs
export function useFetch(url) {

    const fetcher = link => fetch(link).then(r => r.json())

    return useSWR(url, fetcher)
}


//Função para trazer os processos do sistema
export function useProcesses() {
    const { loading, error, data, refetch } = useQuery(gql`
    {
        processes
    }
  `, {
    });
    if (loading || error) return [];
    return data.processes;
}

//Função para verificar os campos obrigatorios do final-form
export function requiredFields(fields) {
    return (values) => {
        let result = {};
        fields.map((field) => {
            if (!Object.byString(values, field)) {
                result[field] = 'Obrigatório';
            }
        });
        return dot.object(result);
    }
}


//Função para trazer os processos do sistema
export function useProductType() {
    const { loading, error, data, refetch } = useQuery(gql`
    {
        getProductType {
          _id
          name
        }
      }
  `, {
    });
    if (loading || error) return [];
    return data.getProductType;
}


//Função para transformar os valores do formulario
export function normalizeValuesForm(params) {
    return (values) => {
        let normalizeValue = JSON.parse(JSON.stringify(values));
        params.map(({
            field,
            normalize
        }) => {
            if (dot.pick(field, normalizeValue)) {
                let value = dot.delete(field, normalizeValue);
                dot.str(field, normalize(value), normalizeValue);
            }
        });
        return normalizeValue;
    }
}

//Função para trazer as categorias do cliente
export function useCategories() {
    const { loading, error, data, refetch } = useQuery(gql`
    {
        category {
            _id
            children
            name
        }
      }
  `, {
    });
    if (loading || error) return [];
    return data.category;
}

//Função para criar o rgba
export function RGBA(rgba) {
    const { r, g, b, a } = rgba;
    return `rgba(${r},${g}, ${b}, ${a})`
}

//Função para trazer caracteristicas do sistema para o produto variavel
export function useCharacteristicType() {
    const { loading, error, data, refetch } = useQuery(gql`
    {
        getCharacteristics {
          _id
          name
        }
      }
  `, {
    });
    if (loading || error) return [];
    return data.getCharacteristics;
}