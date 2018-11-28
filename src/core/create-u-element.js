

export default function (Fn, props) {
  const vm = new Fn(props)
  const el = vm.render()
  // 给最外层dom节点加个标志
  el.setAttribute('data-vm-el', vm.__vmId)
  return el
}