// JavaScript Document

function CreateGrille(grille, dimensionGrille, Cases)
{
	var i,j, type_case;
	
	grille.empty();
	
	for(i = 0; i < dimensionGrille; i++)
	{
		for(j = 0; j < dimensionGrille; j++)
		{
			type_case = Math.floor(Math.random()*Cases.length);
			grille.append("<canvas class=\""+Cases[type_case]+"\"></canvas>");
		}
	}
	
	ActualiseGrille(grille, dimensionGrille);
	
	CompleteGrille(grille, dimensionGrille, Cases);
	
	grille.children("canvas:nth-child("+dimensionGrille+"n+1)").css("clear", "left");
}

function CompleteGrille(grille, dimensionGrille, Cases)
{
	var i, onContinue = true, type_case;

	while(onContinue)
	{
		onContinue = false;
		for(i = dimensionGrille*dimensionGrille - 1; i >= 0; i--)
		{	
			if((grille.children("canvas:eq("+(i)+")").attr('class') == '') && (i >= dimensionGrille) && (grille.children("canvas:eq("+(i-dimensionGrille)+")").attr('class') != ''))
			{
				IntervertirDeuxCases(grille.children("canvas:eq("+(i)+")"), grille.children("canvas:eq("+(i-dimensionGrille)+")"));
				EffaceAlignement(grille, dimensionGrille, grille.children("canvas:eq("+(i)+")"));
				onContinue = true;
			}
			else if((grille.children("canvas:eq("+(i)+")").attr('class') == '') && (i < dimensionGrille))
			{
				type_case = Math.floor(Math.random()*Cases.length);
				grille.children("canvas:eq("+(i)+")").addClass(Cases[type_case]);
				EffaceAlignement(grille, dimensionGrille, grille.children("canvas:eq("+(i)+")"));
				onContinue = true;
			}
		}
	}
}

function ActualiseGrille(grille, dimensionGrille)
{
	var i;
	for(i = dimensionGrille*dimensionGrille - 1; i >= 0; i--)
	{
		EffaceAlignement(grille, dimensionGrille, grille.children("canvas:eq("+(i)+")"));
	}
}

function Combinaison(maCase)
{
	return new Array();
}

function Clignotement(element)
{
	element.fadeOut(25, function(){element.fadeIn(25, function(){element.fadeOut(25, function(){element.fadeIn(25, function(){element.fadeOut(25, function(){element.fadeIn(25);});});});});});
}

function IntervertirDeuxCases(case1, case2, withEffect)
{
	if((case1 == null) || (case2 == null))
	{
		// ERREUR
	}
	else
	{
		var remember1 = case1.attr("class"), remember2 = case2.attr("class");
		
		if(withEffect)
		{
			case1.fadeOut("fast",function(){$(this).removeClass(remember1);$(this).addClass(remember2);$(this).fadeIn("fast");});
			case2.fadeOut("fast",function(){$(this).removeClass(remember2);$(this).addClass(remember1);$(this).fadeIn("fast");});
		}
		else
		{
			case1.removeClass(remember1);case1.addClass(remember2);
			case2.removeClass(remember2);case2.addClass(remember1);
		}
	}
}

function SolutionnableGrille(grille, dim)
{
	var i,j, resultat = false, dimMax = dim*dim, classe;
	
	grille.children().removeClass("green");
	
	for(i = 0; i < dimMax; i++)
	{	
		classe = grille.children("canvas:eq("+(i)+")").attr('class');
		//alert(classe);
		grille.children("canvas:eq("+(i)+")").addClass("green");
	}
	
	return resultat;
}

function TestSiAlignementPossible(grille, dim, maCase, directionATester)
{
	var indexCase = maCase.index(), classeCase = maCase.attr('class');
	var left = false, right = false, up = false, down = false;
	
	switch(directionATester)
	{
		case 'left' :
			indexCase--; 
			break;
			
		case 'right' :
			indexCase++; 
			break;
			
		case 'up' :
			indexCase-=dim;
			break;
			
		case 'down' :
			indexCase+=dim;
			break;
			
		default :
			return false;
			break;
	}
	
	IntervertirDeuxCases(maCase, grille.children("canvas:eq("+(indexCase)+")"), false);
	
	if(grille.children("canvas:eq("+(indexCase-1)+")").attr('class') == classeCase && grille.children("canvas:eq("+(indexCase-1)+")").index() % dim != dim -1)
	{
		left = true;
	}
	if(grille.children("canvas:eq("+(indexCase+1)+")").attr('class') == classeCase && grille.children("canvas:eq("+(indexCase+1)+")").index() % dim != 0)
	{
		right = true;
	}
	if(grille.children("canvas:eq("+(indexCase-dim)+")").attr('class') == classeCase)
	{
		up = true;
	}
	if(grille.children("canvas:eq("+(indexCase+dim)+")").attr('class') == classeCase)
	{
		down = true;
	}
	
	if((left && right) || (up && down))
	{
		IntervertirDeuxCases(maCase, grille.children("canvas:eq("+(indexCase)+")"), false);
		return true;
	}
	else if(left || right || up || down)
	{
		if(
			((left) && (grille.children("canvas:eq("+(indexCase-2)+")").attr('class') == classeCase) && grille.children("canvas:eq("+(indexCase-2)+")").index() % dim != dim -1)
		||((right) && (grille.children("canvas:eq("+(indexCase+2)+")").attr('class') == classeCase) && grille.children("canvas:eq("+(indexCase+2)+")").index() % dim != 0)
		||((up) && (grille.children("canvas:eq("+(indexCase-(2*dim))+")").attr('class') == classeCase))
		||((down) && (grille.children("canvas:eq("+(indexCase+(2*dim))+")").attr('class') == classeCase))
		)
		{
			IntervertirDeuxCases(maCase, grille.children("canvas:eq("+(indexCase)+")"), false);
			return true;
		}
	}
	
	IntervertirDeuxCases(maCase, grille.children("canvas:eq("+(indexCase)+")"), false);
	return false;
}

function EffaceAlignement (grille, dim, maCase)
{
	var indexCase = maCase.index(), classeCase = maCase.attr('class'), i;
	var left = false, right = false, up = false, down = false;
	
	if(classeCase != '')
	{
		if(grille.children("canvas:eq("+(indexCase-1)+")").attr('class') == classeCase)
		{
			left = true;
		}
		if(grille.children("canvas:eq("+(indexCase+1)+")").attr('class') == classeCase)
		{
			right = true;
		}
		if(grille.children("canvas:eq("+(indexCase-dim)+")").attr('class') == classeCase)
		{
			up = true;
		}
		if(grille.children("canvas:eq("+(indexCase+dim)+")").attr('class') == classeCase)
		{
			down = true;
		}
		
		if(
			(left && right)
		||((left) && (grille.children("canvas:eq("+(indexCase-2)+")").attr('class') == classeCase) && grille.children("canvas:eq("+(indexCase-2)+")").index() % dim != dim -1)
		||((right) && (grille.children("canvas:eq("+(indexCase+2)+")").attr('class') == classeCase) && grille.children("canvas:eq("+(indexCase+2)+")").index() % dim != 0)
		)
		{
			maCase.removeClass();
			i = 1;
			while(grille.children("canvas:eq("+(indexCase-i)+")").attr('class') == classeCase && grille.children("canvas:eq("+(indexCase-i)+")").index() % dim != dim -1)
			{
				grille.children("canvas:eq("+(indexCase-i)+")").removeClass();
				i++;
			}
			i = 1;
			while(grille.children("canvas:eq("+(indexCase+i)+")").attr('class') == classeCase && grille.children("canvas:eq("+(indexCase+i)+")").index() % dim != 0)
			{
				grille.children("canvas:eq("+(indexCase+i)+")").removeClass();
				i++;
			}
		}
		else if(
			(up && down)
		||((up) && (grille.children("canvas:eq("+(indexCase-(2*dim))+")").attr('class') == classeCase))
		||((down) && (grille.children("canvas:eq("+(indexCase+(2*dim))+")").attr('class') == classeCase))
		)
		{
			maCase.removeClass();
			i = 1;
			while(grille.children("canvas:eq("+(indexCase-(i*dim))+")").attr('class') == classeCase)
			{
				grille.children("canvas:eq("+(indexCase-(i*dim))+")").removeClass();
				i++;
			}
			i = 1;
			while(grille.children("canvas:eq("+(indexCase+(i*dim))+")").attr('class') == classeCase)
			{
				grille.children("canvas:eq("+(indexCase+(i*dim))+")").removeClass();
				i++;
			}
		}
	}
}