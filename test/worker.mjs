export default {
  async fetch (req, env) {
    return Response.json('Hello World!', { status: 200 })
  }
}
