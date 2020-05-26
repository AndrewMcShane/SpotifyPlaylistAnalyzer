import { TestBed } from '@angular/core/testing';

import { SpotifyApiServiceService } from './spotify-api-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('SpotifyApiServiceService', () => {
  let service: SpotifyApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SpotifyApiServiceService);
  });

  // * Commented out for CI demo
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // */

  it('should redirect to the correct api uri', () => {

    const uri = service.LoginRedirect();

    const expectUriStart = 'https://accounts.spotify.com/authorize';

    const startsWithUri: boolean = uri.startsWith(expectUriStart);

    expect(startsWithUri).toBe(true);

    // Get the query params from the uri
    const urlObj = new URL(uri);

    const params = new URLSearchParams(urlObj.searchParams);

    // Test the existence of a parameter, then the value of it:

    // Test the Client ID:
    let hasParam: boolean = params.has('client_id');
    expect(hasParam).toBe(true);

    let paramValue: string = params.get('client_id');
    expect(paramValue).toBe(environment.client_id_key);

    // Test the Redirect URI
    hasParam = params.has('redirect_uri');
    expect(hasParam).toBe(true);

    paramValue = params.get('redirect_uri');
    expect(paramValue).toBe(environment.redirect_uri);

    // Test response type:
    hasParam = params.has('response_type');
    expect(hasParam).toBe(true);

    paramValue = params.get('response_type');
    expect(paramValue).toBe('token');

    // Test the scopes:
    const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

    hasParam = params.has('scope');
    expect(hasParam).toBe(true);

    paramValue = params.get('scope');
    expect(paramValue).toBe(scope);

  });
});
