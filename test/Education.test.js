const { assert } = require("chai")

const Education = artifacts.require('./Education.sol')

contract('Education', (accounts) => {
    before(async () => {
        this.education = await Education.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.education.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async() => {
        const taskCount = await this.education.eduCount()
        const task = await this.education.eduInformations(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'The first time deployment')
        assert.equal(task.name, 'student name')
        assert.equal(taskCount.toNumber(),1)
    })
})

