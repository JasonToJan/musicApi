import assert from 'assert'
import {qq} from '../src/app'
import fly from 'flyio'

describe('QQ音乐', () => {
    const params = {
        keyword: '周杰伦',
        limit: 1,
        offset: 0,
        type: 1
    }
    it('搜索歌曲 & keyword=周杰伦', async () => {
        const data = await qq.searchSong(params)
        assert.equal(true, data.status)
        assert.equal(true, data.data.keyword === '周杰伦')
    })
    it('获取歌曲地址 & 歌曲地址可连通', async () => {
        const songs = await qq.searchSong(params)
        const data = await qq.getSongUrl(songs.data.songs[0].id)
        const {status} = await fly.get(data.data.url)
        assert.equal(true, data.status)
        assert.equal(true, status === 200 || status === 201)
    })
    it('获取歌词 & 歌词有内容', async () => {
        const songs = await qq.searchSong(params)
        const data = await qq.getLyric(songs.data.songs[0].id)
        assert.equal(true, data.status)
        assert.equal(true, data.data.length > 0)
    })
    it('获取歌词评论 & 评论不为空', async () => {
        const songs = await qq.searchSong(params)
        const data = await qq.getComment(songs.data.songs[0].commentId, 0, 1)
        assert.equal(true, data.status)
        assert.equal(true, data.data.comments.length > 0)
    })
})