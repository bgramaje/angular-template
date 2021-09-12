import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BaseService } from "src/app/shared/services/base.service";
import { API_URL } from "src/app/core/constants/API_URL";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(httpClient: HttpClient) {
        const url: string = `${API_URL}users`;
        super(httpClient, url);
    }

}