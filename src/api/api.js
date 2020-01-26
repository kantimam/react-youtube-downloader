import ID3Writer from 'browser-id3-writer'
import {saveAs} from 'file-saver'
import axios from 'axios'
const BASEURL = "http://localhost:5000/api"  /*  || "http://82.165.121.77:5000" */
//const BASEURL="/api"
const downloaderUrl=BASEURL+"/ytdl"
const searchUrl=BASEURL+"/search"

export async function getVideoData(videoUrl) {
    const response = await fetch(`${downloaderUrl}/simpleinfo?videolink=${videoUrl}`);
    if (response.status >= 400) throw new Error(response)
    return await response.json();


}


/* 
export function downloadVideo(videoUrl, itag, name, progressCallback=(progress)=>console.log(progress)) {
  getFileSize(videoUrl, itag).then(metadata=>{
    axios({
      url: `${downloaderUrl}/download?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
      method: "GET",
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / metadata.data.size);
        //progressCallback(percentCompleted)
      },
    }).then((response)=>{
      const container=metadata.data.format.container || "mp4"
      saveAs(new Blob([response.data]), name?`${name}.${container}`:`video${Date.now()}.mp4`);
    }).catch(error=>console.log(error))
  }).catch(error=>console.log(error))
   
  
} */

export function downloadVideo(videoUrl, itag, name, metadata, progressCallback=(progress)=>console.log(progress), doneCallBack=(progress)=>console.log(progress)) {
  axios({
      url: `${downloaderUrl}/download?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
      method: "GET",
      responseType: "arraybuffer",
      onDownloadProgress: metadata? (progressEvent) => {
        //let percentCompleted = Math.round((progressEvent.loaded * 100) / metadata.size);
        progressCallback(progressEvent.loaded)
      } : null
    }).then((response)=>{
      const container=metadata? metadata.format.container : "mp4"
      saveAs(new Blob([response.data]), name?`${name}.${container}`:`video${Date.now()}.mp4`);
      doneCallBack();
    }).catch(error=>console.log(error))
  
   
  
}


export function downloadMp3(videoUrl, itag, name, artist, title, coverImage, progressCallback=(progress)=>console.log(progress), doneCallBack=(progress)=>console.log(progress)) {
  getFileSize(videoUrl, itag).then(metadata=>{  
  axios({
      url: `${downloaderUrl}/downloadmp3?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
      method: "GET",
      responseType: "arraybuffer",
      onDownloadProgress: metadata? (progressEvent) => {
        //let percentCompleted = Math.round((progressEvent.loaded * 100) / metadata.data.size);
        progressCallback(progressEvent.loaded)
      } : null
  }).then((response)=>{
      

      const writer = new ID3Writer(response.data);
      if(title) writer.setFrame('TIT2', title)
      if(artist) writer.setFrame('TPE1', [artist])
        
      writer.addTag();

      const blob=writer.getBlob();

      saveAs(blob, name?`${name}.mp3`:`music${Date.now()}.mp3`);
      doneCallBack();
    }).catch(error=>console.log(error))

  })
}

export function getFileSize(videoUrl, itag){
  return axios({
    url: `${downloaderUrl}/getsize?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
    method: "GET",
  })
}

export function searchVideo(query, page){
  return fetch(`${BASEURL}/search?q=${query}${page? "&page="+page: ""}`)
    .then(response=>{
        //console.log(response)
        if(!response.ok) throw Error(response.statusText)
        return response.json();
    })
}