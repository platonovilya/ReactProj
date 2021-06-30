using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactProj.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ByteNumController : ControllerBase
	{
		static List<ByteNum> byteNums = new List<ByteNum>()
		{
			new ByteNum() { Id = Guid.NewGuid().ToString(), Binary = "0 0 0 0 0 0 1 1", Dec = 3},
			new ByteNum() { Id = Guid.NewGuid().ToString(), Binary = "0 0 0 0 0 1 1 1", Dec = 7}
		};

		[HttpGet]
		public IEnumerable<ByteNum> Get()
		{
			return byteNums;
		}
		[HttpPost]
		public IActionResult Post(ByteNum byteNum)
		{

			try
			{
				int[] binary = Array.ConvertAll(byteNum.Binary.Split(' '), Int32.Parse);
				for (int i = 0; i < binary.Length; i++)
				{
					if (!(binary[i] == 1 || binary[i] == 0)) return BadRequest();
				}
				if (binary.Length != 8) return BadRequest();
				byteNum.Dec = calculateDec(binary);
			}
			catch (Exception)
			{
				return BadRequest();
			}
			
			byteNum.Id = Guid.NewGuid().ToString();
			byteNums.Add(byteNum);
			return Ok(byteNum);
		}
		int calculateDec(int[] binary)
		{
			int dec = 0;
			for (int i = 0; i < binary.Length; i++)
			{
				dec += binary[i] * Convert.ToInt32(Math.Pow(2, 7 - i));
			}
			return dec;
		}
	}
}
