const BASEURL = "http://82.165.121.77:5000"

export async function getVideoData(videoUrl) {
    const response = await fetch(`${BASEURL}/simpleinfo?videolink=${videoUrl}`);
    if (response.status >= 400) throw new Error(response)
    return await response.json();


}