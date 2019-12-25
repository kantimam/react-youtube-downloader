import ID3Writer from 'browser-id3-writer'
import {saveAs} from 'file-saver'
import axios from 'axios'
const BASEURL = "http://localhost" || "http://82.165.121.77:5000"

export async function getVideoData(videoUrl) {
    const response = await fetch(`${BASEURL}/simpleinfo?videolink=${videoUrl}`);
    if (response.status >= 400) throw new Error(response)
    return await response.json();


}

export async function downloadMp3Fetch(videoUrl, artist, title, coverImage) {
    const response = await fetch(`localhost/downloadmp3?videolink=${videoUrl}`);
    if (response.status !== 200) throw new Error(response)
    /* const arrayBuffer=await response.arrayBuffer();

    const writer = new ID3Writer(arrayBuffer);
    writer.setFrame('TIT2', 'Home')
      .setFrame('TPE1', ['Eminem', '50 Cent'])
      .setFrame('TALB', 'Friday Night Lights')
      .setFrame('TYER', 2004)
      .setFrame('TRCK', '6/8')
      .setFrame('TCON', ['Soundtrack'])
      .setFrame('TBPM', 128)
      .setFrame('WPAY', 'https://google.com')
      .setFrame('TKEY', 'Fbm')
    writer.addTag();

    const taggedSongBuffer = writer.arrayBuffer;
    const blob =await writer.getBlob();
    const url =await writer.getURL();

    saveAs(url, 'song with tags.mp3'); */
    console.log(response.body)

    const blob=await response.body.blob();
    const url=URL.createObjectURL(blob)

    saveAs(url, "example.mp3")


}


export async function downloadVideo(videoUrl, itag, name, container="mp4") {
  
  axios({
      url: `http://localhost/download?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
      method: "GET",
      responseType: "arraybuffer"
  }).then((response)=>{
      saveAs(new Blob([response.data]), name?`${name}.${container}`:`video${Date.now()}.mp4`);
    }).catch(error=>console.log(error))


}

export async function downloadMp3(videoUrl, itag, name, artist, title, coverImage) {
    
  axios({
      url: `http://localhost/downloadmp3?videolink=${videoUrl}${itag?`&format=${itag}`:""}`,
      method: "GET",
      responseType: "arraybuffer"
  }).then((response)=>{
      

      const writer = new ID3Writer(response.data);
      if(title) writer.setFrame('TIT2', title)
      if(artist) writer.setFrame('TPE1', [artist])
        
      writer.addTag();

      const blob =writer.getBlob();

      saveAs(blob, name?`${name}.mp3`:`music${Date.now()}.mp3`);
    }).catch(error=>console.log(error))

    


}