import { shallowMount } from '@vue/test-utils'
import Problem from '@/components/Problem.vue'
import problemGenerator from '@/components/problem_generator.js'

Problem.methods.generateQuestion = problemGenerator.problem_generator_1;

var i;
for(i=0;i<=50;i++){
  var q = problemGenerator.problem_generator_3();
  console.log(q.question);
}

describe('Problem.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Problem, {
      propsData: { msg }
    })
    // expect(wrapper.text()).toMatch(msg)
  })
})
