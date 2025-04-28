import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  signup(name: string, email: string, password: string): Observable<boolean> {
    if (name && email && password) {
      // Get the existing users array from localStorage or create a new one if empty
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Create a new user object
      const newUser = { name, email, password };
      
      // Save the new user to the users array
      users.push(newUser);
      
      // Store the updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      this.isLoggedInSubject.next(true);
      return of(true);
    }
    return of(false);
  }
  
  login(email: string, password: string): Observable<boolean> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find the user with the matching email and password
    const user = users.find((user: any) => user.email === email && user.password === password);
  
    if (user) {
      this.isLoggedInSubject.next(true);
      return of(true);
    }
  
    this.isLoggedInSubject.next(false);
    return of(false);
  }
  
  
 logout(): void {
    this.isLoggedInSubject.next(false);
  }

 isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }


}
