
export default function downloadResume(resumeUrl) {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = resumeUrl.split("/").pop(); // sets the default file name
    link.target = "_blank"; // optional: opens in new tab before download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}