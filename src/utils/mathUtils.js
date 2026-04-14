import { create, all } from 'mathjs'

// Create a shared mathjs instance to avoid bundling it multiple times
const math = create(all)

export default math
export { math }