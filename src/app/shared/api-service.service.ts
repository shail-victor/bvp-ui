import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Time-Stamp': 'test',
      // 'user_id': localStorage.getItem('user_id')
    })
  };
  bvp_endpoint: any;

  constructor(private http: HttpClient) {
    this.bvp_endpoint = environment.bvp_endpoint;
   }

  loginService(request): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/login`;
    const body = request;
    return this.http.post(url, body, this.httpOptions);
  }

  registrationService(request): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/user/register`;
    const body = request;
    return this.http.post(url, body, this.httpOptions);
  }

  getQuestionData(): Observable<any> {
    const url = 'assets/json/questions.json';
    return this.http.get(url);
  }

  getQuestionnaireData(queryParam): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Time-Stamp': 'test',
        'user_id': localStorage.getItem('user_id')
      })
    };
    const url = `${this.bvp_endpoint}/bvp/question?q_no=`+queryParam;
    return this.http.get(url, httpOptions);
  }

  saveQuestionnaireData(request): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/question`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Time-Stamp': 'test',
        'user_id': localStorage.getItem('user_id')
      })
    };
    const body = request;
    return this.http.post(url, body, httpOptions);
  }

  uploadFile(files, queryParam): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/question/files_upload?q_no=`+queryParam;
    let httpOptions = {
      headers: new HttpHeaders({
        'Time-Stamp': 'test',
        'user_id': localStorage.getItem('user_id'),
      })
    };
    let finalData: FormData = new FormData();
    finalData.append('files[]', files);
    return this.http.post(url, finalData, httpOptions);
  }

  getAllUsers(): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/all_users`;
    return this.http.get(url, this.httpOptions);
  }

  getYearList(userId): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/user/year`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Time-Stamp': 'test',
        'user_id': userId,
      })
    };
    return this.http.get(url, httpOptions)
  }

  downloadReport(data): Observable<any> {
    const url = `${this.bvp_endpoint}/bvp/generate/report`;
    let httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Time-Stamp': 'test',
        'user_id': data['user_id'],
        'year': data['year'],
        'college_name': data['college_name']
      })
    };
    return this.http.get(url, httpOptions);
  }
}
