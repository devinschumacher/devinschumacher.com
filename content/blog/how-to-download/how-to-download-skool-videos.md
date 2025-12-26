# Skool Video Downloader v2.0.0 | How to Download Skool Classroom Video Content for Offline Viewing


<a href="https://www.youtube.com/watch?v=YBBSkdb1YAw" target="_blank">
<img src="https://raw.githubusercontent.com/devinschumacher/uploads/refs/heads/main/images/how-to-download-skoolcom-course-videos-loom-vimeo-wistia-youtube-community-posts.jpg" width="700px">
</a>


## 🔗 Links

- 🎁 Get it [here](https://serp.ly/skool-video-downloader-extension)
- ❓ Check FAQs [here](https://github.com/orgs/serpapps/discussions/categories/faq)
- 🐛 Report bugs [here](https://github.com/serpapps/skool-downloader/issues)
- 🆕 Request features [here](https://github.com/serpapps/skool-downloader/issues)

### Resources

- 💬 [Community](https://serp.ly/@serp/community)
- 💌 [Newsletter](https://serp.ly/@serp/email)
- 🛒 [Shop](https://serp.ly/@serp/store)
- 🎓 [Courses](https://serp.ly/@serp/courses)

This release adds comprehensive support for downloading videos across all Skool.com page types with multi-platform compatibility.

### ✨ What's New
- **Universal Page Support**: Download videos from classrooms, community posts, and about pages
- **Multi-Platform Compatibility**: Full support for Wistia, Loom, Vimeo, and YouTube videos
- **Enhanced Detection**: Improved video detection across all supported platforms
- **Streamlined Experience**: Consistent download functionality regardless of page type or video platform

### Supported Platforms & Pages

| Page Type | Wistia | Loom | Vimeo | YouTube |
|-----------|--------|------|-------|---------|
| Classrooms | ✅ | ✅ | ✅ | ✅ |
| Community Posts | ✅ | ✅ | ✅ | ✅ |
| About Pages | ✅ | ✅ | ✅ | ✅ |

### What's New
- **Universal Page Support**: Download videos from classrooms, community posts, and about pages
- **Multi-Platform Compatibility**: Full support for Wistia, Loom, Vimeo, and YouTube videos
- **Enhanced Detection**: Improved video detection across all supported platforms
- **Streamlined Experience**: Consistent download functionality regardless of page type or video platform

## Installation Instructions

1. "Star ⭐" this repository <a href="https://public-files.gumroad.com/fgqglcvq4v0u32yc0x0jvsllk4x6" target="_blank">click the button that looks like this</a>
2. Download the skool downloader extension from `/releases`
3. Double click the `.zip` file on your computer to unzip it
4. Paste this in the chrome browser bar: `chrome://extensions/`
5. Enable "developer mode" by clicking the toggle switch on the top right
6. Install the 'skool downloader extension' by clicking "Load unpacked" and choosing the 'skool downloader extension' folder on your computer (the FOLDER, not the .zip)
7.  Pin the extension to chrome by clicking the puzzle looking icon thing and then the 'pin' icon

> Note: The first time you load the extension you will be prompted to enter your email & license key (this was sent to your email address that you purchased with).

### How to Use

1. Visit the skool.com page where you want to download the video ('refresh' the page if needed)
2. Click the extension icon in your browser
3. Wait a second or two for the video to load (Click the video on the page if needed) 
4. Click "Download video"

<img width="3360" height="1962" alt="skool video downloader 1" src="https://gist.github.com/user-attachments/assets/4141fce9-d08e-4173-8d78-df2e2dc4ae25" />


<img width="3398" height="1578" alt="skool video downloader 2" src="https://gist.github.com/user-attachments/assets/62045abb-024a-44c8-a8dd-5a0525c9f483" />


<img width="3426" height="1452" alt="skool video downloader 3" src="https://gist.github.com/user-attachments/assets/a86d1eb6-0c1d-4427-b1e7-bd602590b16e" />


## Permissions Justifications

### activeTab  
We use the `activeTab` permission so the extension can interact with the currently open Skool lesson page when the user activates the extension. This is necessary to detect and process downloadable video content on the page.


### clipboardRead  
The `clipboardRead` permission is used so the extension can read download links or other relevant information from the clipboard, if the user chooses to copy a video URL or lesson link for processing within the extension.


### contextMenus  
We use the `contextMenus` permission to add right-click options, making it easy for users to initiate downloads or perform actions related to Skool classroom videos directly from the context menu.


### cookies  
The `cookies` permission is required to access authentication tokens and session cookies for Skool.com. This allows the extension to properly access and download videos that require user authentication.


### downloads  
We use the `downloads` permission to save videos from Skool classroom lessons to the user’s device for offline viewing. This is a core function of the extension.


### notifications  
The `notifications` permission is used to inform the user about the progress, completion, or errors related to downloads, improving transparency and user experience.


### offscreen  
The `offscreen` permission allows us to process video data or perform background tasks (such as fetching video streams) without interrupting the user’s browsing experience.


### scripting  
We use the `scripting` permission to inject and execute scripts on Skool lesson pages. This is necessary to identify video elements and facilitate downloading.


### webNavigation  
The `webNavigation` permission is needed to detect when the user navigates to new Skool lesson pages. This allows the extension to automatically update its state and provide download options on the correct pages.


## Related

- https://github.com/serpapps/skool-downloader
- [How to Download Skool Classroom Video Content for Offline Viewing](https://gist.github.com/devinschumacher/4e5ac5235101d89989f4d8d5ad0d09cc)
- [How to Bulk Download All the Videos in a Skool Classroom](https://gist.github.com/devinschumacher/26be6111dddf12e6ce02d236e2bc1385)
- [How to Download Skool Videos Using yt-dlp and a Signed .m3u8 URL](https://gist.github.com/devinschumacher/e662f0ee7cad29ab384ffddf18754653)
- [How to Download Skool Videos with yt-dlp](https://gist.github.com/devinschumacher/9bd2da8c7b01dcc3acc367bb5f85a51f)
- [How to Download Skool Videos (.m3u8?token URL type // HLS Stream)](https://gist.github.com/devinschumacher/4b80eb6bbefebb18594557a210c1980e)
- [How to Download Skool.com Videos (and the Entire Course)](https://gist.github.com/devinschumacher/69615573b027b1cd5ead318739811613)