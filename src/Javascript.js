import { render } from "mustache";

let comments = [];

if (localStorage.myTreesComments) {
  comments = JSON.parse(localStorage.myTreesComments);
}

console.log(comments);

function opinion2html(opinion) {
  //in the case of Mustache, we must prepare data beforehand:
  opinion.createdDate = new Date(opinion.created).toDateString();

  //get the template:
  const template = document.getElementById("commentTemplate").innerHTML;
  //use the Mustache:
  const htmlWOp = render(template, opinion);

  //delete the createdDate item as we created it only for the template rendering:
  delete opinion.createdDate;

  //return the rendered HTML:
  return htmlWOp;
}

function opinionArray2html(sourceData) {
  return sourceData.reduce(
    (htmlWithOpinions, opn) => htmlWithOpinions + opinion2html(opn),
    ""
  ); //"" is the initial value of htmlWithOpinions in reduce. If we do not use it, the first member of sourceData will not be processed correctly
}

const opinionsElm = document.getElementById("opinionsContainer");

if (localStorage.myTreesComments) {
  comments = JSON.parse(localStorage.myTreesComments);
}

opinionsElm.innerHTML = opinionArray2html(comments);
