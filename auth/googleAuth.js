export function loadGapi() {
    return new Promise((resolve) => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: 'AIzaSyBNlKva_IENAJ_wh_5V0XXjYFStAi9H_FU',
                clientId: '424099318507-k1gip7of08upv8jn9fn909vpivgd6bbq.apps.googleusercontent.com',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                scope: 'https://www.googleapis.com/auth/calendar',
            }).then(() => {
                resolve(window.gapi);
            });
        });
    });
}

export function signIn() {
    return window.gapi.auth2.getAuthInstance().signIn();
}

export function signOut() {
    return window.gapi.auth2.getAuthInstance().signOut();
}

export function isSignedIn() {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
}

export function getCurrentUser() {
    return window.gapi.auth2.getAuthInstance().currentUser.get();
}
