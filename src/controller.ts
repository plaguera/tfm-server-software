import httpStatus from 'http-status';
import { OAuth } from './oauth';
import { Repository } from './repository'
import { Request, Response } from 'express';
import { User } from './user'

const sendReponse = function (res: Response<any>, statusCode: number, data: object | null) {
    res.status(statusCode).json(data);
};

export class Controller {

    static oauth: OAuth = new OAuth;

    static user(req: Request, res: Response) {
        let user = new User(req.params.id || '');
        user.get().then(result => {
            sendReponse(res, httpStatus.OK, result);
        }).catch((error) => {
            sendReponse(res, httpStatus.NOT_FOUND, null);
            console.error(error);
        });
    }

    static repo(req: Request, res: Response) {
        let repo = new Repository(req.params.user, req.params.repo);
        repo.get().then(result => {
            sendReponse(res, httpStatus.OK, result);
        }).catch((error) => {
            sendReponse(res, httpStatus.NOT_FOUND, null);
            console.error(error);
        });
    }

    static issues(req: Request, res: Response) {
        let repo = new Repository(req.params.user, req.params.repo);
        if (req.method == 'GET') {
            repo.issues().then(result => {
                (result as Array<Object>).sort((a, b) => { return a['number'] - b['number']; });
                sendReponse(res, httpStatus.OK, result);
            }).catch((error) => {
                sendReponse(res, httpStatus.NOT_FOUND, null);
                console.error(error);
            });
        } else if (req.method == 'POST') {
            repo.create_issue(req.body).then(result => {
                sendReponse(res, httpStatus.OK, result);
            }).catch((error) => {
                sendReponse(res, httpStatus.NOT_FOUND, null);
                console.error(error);
            });
        }
    }

    static comments(req: Request, res: Response) {
        let repo = new Repository(req.params.user, req.params.repo);
        let issuenumber = Number.parseInt(req.params.issuenumber);
        if (req.method == 'GET') {
            repo.comments(issuenumber).then(result => {
                sendReponse(res, httpStatus.OK, result);
            }).catch((error) => {
                sendReponse(res, httpStatus.NOT_FOUND, null);
                console.error(error);
            });
        }
    }

    static comment(req: Request, res: Response) {
        let repo = new Repository(req.params.user, req.params.repo);
        if (req.method == 'GET') {
            let comment_id = Number.parseInt(req.params.comment_id);
            repo.comment(comment_id).then(result => {
                sendReponse(res, httpStatus.OK, result);
            }).catch((error) => {
                sendReponse(res, httpStatus.NOT_FOUND, null);
                console.error(error);
            });
        } else if (req.method == 'POST') {
            let issuenumber = Number.parseInt(req.params.issuenumber);
            repo.create_comment(issuenumber, req.body).then(result => {
                sendReponse(res, httpStatus.OK, result);
            }).catch((error) => {
                sendReponse(res, httpStatus.NOT_FOUND, null);
                console.error(error);
            });
        }
    }

    static async authorize(req: Request, res: Response) {
        res.redirect(Controller.oauth.authorize(req.headers.referer));
        /*console.log(req.query);
        Controller.oauth.access_token(req.query.code).then((result: any) => {
            //res.redirect('http://localhost:1234');
            //sendReponse(res, httpStatus.OK, result);
        }).catch((error: any) => {
            //sendReponse(res, httpStatus.NOT_FOUND, null);
            console.error(error);
        });
        */
    }

    static async authorized(req: Request, res: Response) {
        console.log(req.session !== undefined && req.session.access_token !== undefined)
        res.json({ logged_in: req.session !== undefined && req.session.access_token !== undefined });
    }

    static async access_token(req: Request, res: Response) {
        Controller.oauth.access_token(req.query.code).then(re => {
            req.session!.access_token = re['access_token'];
            req.session!.logged_in = true;
            console.log('A = ' + Controller.oauth.redirectURI);
            console.log('B = ' + JSON.stringify(req.session));
            req.session?.regenerate(() => res.redirect(Controller.oauth.redirectURI));
        }).catch((error) => console.error(error));
    }

}