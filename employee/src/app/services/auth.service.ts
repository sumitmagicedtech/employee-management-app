import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // login(email: string, password: string): Observable<boolean> {
  //   // Mock login logic (replace with real API call)
  //   if (email && password) {
  //     this.isLoggedInSubject.next(true);
  //     return of(true);
  //   }
  //   return of(false);
  // }

  // signup(name: string, email: string, password: string): Observable<boolean> {
  //   // Mock signup logic (replace with real API call)
  //   if (name && email && password) {
  //     // Assume signup is successful, now log the user in automatically
  //     this.isLoggedInSubject.next(true); // Set the login status to true
  //     return of(true);
  //   }
  //   return of(false);
  // }

  // isLoggedIn(): Observable<boolean> {
  //   return this.isLoggedInSubject.asObservable();
  // }

  // logout(): void {
  //   this.isLoggedInSubject.next(false);
  //   localStorage.removeItem('employeeApp'); // Optional: clear saved session
  // }
  

  // signup(name: string, email: string, password: string): Observable<boolean> {
  //   if (name && email && password) {
  //     const user = { name, email, password };
  //     localStorage.setItem('registeredUser', JSON.stringify(user));
  //     this.isLoggedInSubject.next(true);
  //     return of(true);
  //   }
  //   return of(false);
  // }
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
  
  
  // login(email: string, password: string): Observable<boolean> {
  //   const storedUser = localStorage.getItem('registeredUser');
  
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     if (user.email === email && user.password === password) {
  //       this.isLoggedInSubject.next(true);
  //       return of(true);
  //     }
  //   }
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
    // localStorage.removeItem('employeeApp'); // Optional: clear saved session
  }

 isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }


}
