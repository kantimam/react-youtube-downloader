import ID3Writer from 'browser-id3-writer'
import {
  saveAs
} from 'file-saver'
import axios from 'axios'
//const BASEURL = "http://localhost:5000/api" /*  || "http://82.165.121.77:5000" */
const BASEURL="/api"
const downloaderUrl = BASEURL + "/ytdl"
const searchUrl = BASEURL + "/search"
const downloadProxyUrl = BASEURL + "/dlproxy"

export async function getVideoData(videoUrl) {
  const response = await fetch(`${downloaderUrl}/simpleinfo?videolink=${videoUrl}`);
  if (response.status >= 400) throw new Error(response)
  return await response.json();

}



export function downloadVideo(videoUrl, itag, name, metadata, progressCallback = (progress) => console.log(progress), doneCallBack = (progress) => console.log(progress)) {
  axios({
    url: `${downloaderUrl}/download?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
    method: "GET",
    responseType: "arraybuffer",
    onDownloadProgress: metadata ? (progressEvent) => {
      console.log(progressEvent.loaded)
      progressCallback(progressEvent.loaded)
    } : null
  }).then((response) => {
    const container = metadata ? metadata.format.container : "mp4"
    saveAs(new Blob([response.data]), name ? `${name}.${container}` : `video${Date.now()}.mp4`);
    doneCallBack("finished");
  }).catch(error => {
    console.log(error)
    doneCallBack("failed! :(");

  })
}

export function directDownloadVideo(videoUrl, itag){
  window.open(`${downloaderUrl}/downloadmp3?videolink=${videoUrl}${itag?`&format=${itag}`:""}`, '_blank');
}


export function downloadMp3(videoUrl, itag, name, metadata, mp3Data, progressCallback = (progress) => console.log(progress), doneCallBack = (progress) => console.log(progress)) {
  axios({
    url: `${downloaderUrl}/downloadmp3?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
    method: "GET",
    responseType: "arraybuffer",
    onDownloadProgress: metadata ? (progressEvent) => {
      progressCallback(progressEvent.loaded)
    } : null
  }).then((response) => {


    const writer = new ID3Writer(response.data);
    if (mp3Data) {
      const {
        title,
        artist,
        cover
      } = mp3Data;
      if (title) writer.setFrame('TIT2', title)
      if (artist) writer.setFrame('TPE1', [artist])
      /* if (cover) {
        console.log(cover)
        getCorsImage(cover, (buffer)=>{
          writer.setFrame('APIC', {
            type: 3,
            data: buffer,
            description: 'cover'
        })
        })

      } */
    }
    writer.addTag();

    const blob = writer.getBlob();

    saveAs(blob, name ? `${name}.mp3` : `music${Date.now()}.mp3`);
    doneCallBack("finished");
  }).catch(error => {
    console.log(error)
    doneCallBack("failed! :(");

  })


}

export function downloadMp3Fast(videoUrl, itag, name, metadata, mp3Data, progressCallback = (progress) => console.log(progress), doneCallBack = (progress) => console.log(progress)) {
  axios({
    url: `${downloaderUrl}/downloadmp3?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
    method: "GET",
    responseType: "arraybuffer",
    onDownloadProgress: metadata ? (progressEvent) => {
      progressCallback(progressEvent.loaded)
    } : null
  }).then((response) => {


    const writer = new ID3Writer(response.data);
    if (mp3Data) {
      const {
        title,
        artist,
      } = mp3Data;
      if (title) writer.setFrame('TIT2', title)
      if (artist) writer.setFrame('TPE1', [artist])
      
    }
    writer.addTag();

    const blob = writer.getBlob();

    saveAs(blob, name ? `${name}.mp3` : `music${Date.now()}.mp3`);
    doneCallBack("finished");
  }).catch(error => {
    console.log(error)
    doneCallBack("failed! :(");

  })


}

export function directDownloadMp3(videoUrl, itag){
  window.open(`${downloaderUrl}/downloadmp3?videolink=${videoUrl}${itag?`&format=${itag}`:""}`, '_blank');
}



function getCorsImage(url, cb) {
  const link = `${downloadProxyUrl}?link=${url}`
  fetch(link).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.arrayBuffer();
  }).then(buffer => {
    cb(buffer)
  }).catch(e => console.log(e))
}


export function getFileSize(videoUrl, itag) {
  return axios({
    url: `${downloaderUrl}/getsize?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
    method: "GET",
  })
}

export function searchVideo(query, page) {
  return fetch(`${BASEURL}/search?q=${query}${page? "&page="+page: ""}`)
    .then(response => {
      //console.log(response)
      if (!response.ok) throw Error(response.statusText)
      return response.json();
    })
}