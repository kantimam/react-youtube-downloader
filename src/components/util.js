export function redirectIfValid(history){
    if(history && history.location && history.location.search){
        const parsedUrl=new URL(window.location.toString());
        const url=parsedUrl.searchParams.get("url");
        if(url){
            const ytID=getYoutubeID(url);
            if(ytID) return history.push(`/video/${ytID}`)
            /* if not a valid youtube id go to start page */
            history.push('/');
        }
        
    }
}

export function getYoutubeID(url){
    /* check if its a valid youtube url and then take the first 11 chars of id and ditch the others */
    const idRegex = /^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}).*/;
    const urlComponents=url.match(idRegex)
    if (urlComponents && urlComponents[4]) {
        return urlComponents[4]
    }
    return false
}