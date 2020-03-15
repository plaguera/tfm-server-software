import fetch from 'node-fetch';
import { strict } from 'assert';
import http = require('http');

interface AccessToken {
    value: string;
    type: string;
    scope: string;
} 

export class OAuth {

    accessToken: AccessToken = { value: '', type: '', scope: '' };
    accessTokenURL: string = 'https://github.com/login/oauth/access_token';
    code: string = '';
    redirectURI: string = '';

    getParamURL(): string {
        return  this.accessTokenURL
                + `?client_id=${process.env.CLIENT_ID}`
                + `&client_secret=${process.env.CLIENT_SECRET}`
                + `&code=${this.code}`
                //+ `&redirect_uri=${this.redirectURI}`; 
    }

    authorized(): boolean {
        return this.accessToken.value != '';
    }

    authorize(referer?: string) {
        if (referer)
            this.redirectURI = referer;
        console.log('HOLA = ' + this.redirectURI)
        return 'https://github.com/login/oauth/authorize'
                + `?client_id=${process.env.CLIENT_ID}`;
                //+ `?redirect_uri=${this.redirectURI}`;
    }

    async access_token(code: string) {
        this.code = code;
        let res = await this.fetch('POST', this.getParamURL());
        console.log(res);
        this.accessToken.value = res['access_token'];
        this.accessToken.type = res['token_type'];
        this.accessToken.scope = res['scope'];
        return res;
    }

    async fetch(method: string, url: string): Promise<string> {
        let init = {
            method: method,
            headers: {
                Accept: 'application/json' 
            }
        };
        return await fetch(url, init).then(res => res.text()).then(body => JSON.parse(body)).catch((error) => console.error(error));
    }

}