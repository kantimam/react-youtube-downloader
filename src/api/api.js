import ID3Writer from 'browser-id3-writer'
import {saveAs} from 'file-saver'
import axios from 'axios'
const BASEURL = "http://82.165.121.77:5000"

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


export async function downloadMp3(videoUrl, artist, title, coverImage) {
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
    axios({
        url: `http://localhost/downloadmp3?videolink=${videoUrl}`,
        method: "GET",
        responseType: "arraybuffer"
    }).then((response)=>{
        console.log(response)
        /* const objectUrl=URL.createObjectURL(new Blob([response.data]));
        saveAs(objectUrl, "test.mp3") */

        const writer = new ID3Writer(response.data);
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
    const blob =writer.getBlob();

    saveAs(blob, 'song with tags.mp3');
    }).catch(error=>console.log(error))

    


}