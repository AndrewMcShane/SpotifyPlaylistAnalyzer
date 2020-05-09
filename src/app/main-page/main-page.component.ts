import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SpotifyApiServiceService } from '../_services/spotify-api-service.service';
import { Playlist } from '../_models/Playlist';
import { Track } from '../_models/Track';
import { Album } from '../_models/album';
import { Callback } from '../_models/logincallback'
//components
import { CategorySelectorComponent } from '../main-page/category-selector/category-selector.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  linkSubmitStr : string;
  bearerTokenStr: string;

  apiResponse: string;

  userPlaylist: Playlist;

  loginCallback : Callback;

  constructor(
    private spotifyApi: SpotifyApiServiceService,
    private router: Router,
    private route: ActivatedRoute
    ) { 

    this.linkSubmitStr = "";
    this.userPlaylist = new Playlist();
    this.userPlaylist.tracks = new Array<Track>();
  }


  ngOnInit(): void {
    
  console.log(this.router.url);


  console.log(this.route.snapshot.fragment); // only update on component creation
  this.route.fragment.subscribe(
    fragment => {
      // Convert to Url search params:
      let params = new URLSearchParams("?" + fragment);

      //console.log(params);

      if (params.has('access_token') && params.has('expires_in') && params.has('state') )
      {
        this.loginCallback = new Callback();

        let tmpAccessToken = params.get('access_token');
        let tmpExpiresIn = params.get('expires_in');
        let tmpState = params.get('state');

        if (tmpAccessToken != "" && tmpExpiresIn != "" && tmpState != "")
        {
          this.loginCallback.access_token = tmpAccessToken;
          this.loginCallback.expires_in = parseInt(tmpExpiresIn);
          this.loginCallback.state = tmpState;
        }
        else{
          console.log("login failed 1");
          this.router.navigate([""])
          console.log("login failed 2");
          
        }
      }
      else {
        console.log("login failed 3");
        this.router.navigate([""])
        console.log("login failed 4");
      }
      

    }
  ); 

  }

  AnalysisButtonClicked()
  {

    console.log("Calling to spotify api service");

    this.spotifyApi.GetPlaylistResults(this.linkSubmitStr, this.loginCallback.access_token)
    .subscribe(
      response => {
        this.apiResponse = JSON.stringify(response);
        console.log("Api call recieved");
        console.log(this.loginCallback.access_token);
        if(response.items)
        {
        
          this.userPlaylist.tracks = new Array<Track>();

          for(let item of response.items)
          {
            // Get the album data, get the track data
            let tmpTrack = new Track();
            tmpTrack.href = item.track.href;
            tmpTrack.name = item.track.name;
            console.log(item.track.name);
            if(item.track.album)
            {
              let tmpAlbum = new Album();
              tmpAlbum.href = item.track.album.href;
              tmpAlbum.name = item.track.album.name;

              tmpTrack.album = tmpAlbum;
            }
            
            this.userPlaylist.tracks.push(tmpTrack);
            
          }
        }

      }
    )

  }
  // LoginButtonClicked()
  // {
  //   console.log("Calling to spotify login api service");
  //   /*this.spotifyApi.LoginRedirect()
  //   .subscribe(
  //     response => {
  //       this.apiResponse = JSON.stringify(response);
  //       console.log("Api call recieved");
  //     }
  //   )*/
  //   window.location.href = this.spotifyApi.LoginRedirect();

  // }
}
