import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
try {
if (!text) throw '*Masukkan link*\n Example: https://soundcloud.com/prodkinka/snk'
let res = await axios('https://violetics.pw/api/downloader/soundcloud?apikey=beta&url=' + text)
let json = res.data
let dapet = json.result.url
	let row = Object.values(dapet).map((v, index) => ({
		title: htjava + 'š Quality: ' + v.name,
		description: '\nā Host: ' + json.result.hosting + '\nā²ļø Title: ' + json.result.meta.title + '\nā²ļø Duration: ' + json.result.meta.duration + '\nš URL: ' + v.url + '\n\nš Player URL: ' + json.result.player.url,
		rowId: usedPrefix + 'get ' + v.url
	}))
	let button = {
		buttonText: `āļø ${command} Search Disini āļø`,
		description: `ā” Hai ${name}, Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: wm
	}
	return conn.sendListM(m.chat, button, row, m)
	} catch {
	if (!text) throw '*Masukkan link*\n Example: https://soundcloud.com/prodkinka/snk'
let res = await axios('https://violetics.pw/api/downloader/soundcloud?apikey=beta&url=' + text)
let json = res.data
let dapet = json.result.dlink
	conn.sendFile(m.chat, json.result.dlink, json.result.title + '.mp3', `
*${htki} YOUTUBE ${htka}*

*${htjava} Title:* ${json.result.title}
`.trim(), m, null, { fileLength: fsizedoc, seconds: fsizedoc, mimetype: 'audio/mp4', contextInfo: {
          externalAdReply :{
    mediaUrl: sig,
    mediaType: 2,
    description: wm, 
    title: 'š Hai, ' + name + ' ' + ucapan,
    body: botdate,
    thumbnail: await(await fetch(json.result.thumb)).buffer(),
    sourceUrl: json.result.dlink
     }}
  })
	}
}
handler.help = ['scloud'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^scloud$/i

handler.exp = 0
handler.register = false
handler.limit = true


export default handler