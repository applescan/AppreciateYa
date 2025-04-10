import React from "react";
import ReactECharts from "echarts-for-react";

const ThankYouChart = ({
  thankYous,
  totalPost,
}: {
  thankYous: number;
  totalPost: number;
}) => {
  const symbols =
    "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnXmcHFW1x3+nujsbCRAg7AgkKIIPBYmAT5EEWVwAJRpI9wCyGRREiSaT7oliUEjPTAIEcYHIJpieiQMJbih7SNxAAzwXFtlilAQIJECGzEy6q86zepaEYWa69rpVdfofPjr3nnvO99z+5VfVtRDkIwSEgBBIKAFKaN1SthAQAkIAIoCyCYSAEEgsARHAxLZeChcCQkAEUPaAEBACiSUgApjY1kvhQkAIiADKHhACQiCxBEQAE9t6KVwICAERQNkDQkAIJJaACGBiWy+FCwEhIAIoe0AICIHEEhABTGzrpXAhIAREAGUPCAEhkFgCIoCJbb0ULgSEgAig7AEhIAQSS0AEMLGtl8KFgBAQAZQ9IASEQGIJiAAmtvVSuBAQAiKAsgeEgBBILAERwMS2XgoXAkJABFD2gBAQAoklIAKY2NZL4UJACIgAyh4QAkIgsQREABPbeilcCAgBEUDZA0JACCSWgAhgYlsvhQsBISACKHtACAiBxBIQAUxs66VwISAERABlDwgBIZBYAiKAiW29FC4EhIAIoOwBISAEEktABDCxrZfChYAQEAGUPSAEhEBiCYgAJrb1UrgQEAIigLIHhIAQSCwBEcDEtl4KFwJCQARQ9oAQEAKJJSACmNjWS+FCQAiIAMoeEAJCILEERAAT23opXAgIARHA2nugyuitafV7ZDRtD83g3UG0RwrYDRp2AGtjQMZoMI0GMAYAg7EZhM1g3gyizT3/+w2d8SKTvkbXec2IJfOf71maa6cgI2JMgF7P5XccyZV9Upzah0D7aJq2O8DbgWgU2BgF0EiAe/5r7jDaBOJ2EG2Cwe0ANurAywxexwav26J1vjS65ZpXau2vjo6O/c0xI0eOfCHGfIcsTQRwGzzrT6kfs+No7UgNeK8GejeAAwC8p+e/fuyRdWB+AaQ9YUB/VDe0R4e1Fh+ptXH9SERi+k6AOqbl982QcWiK0h9kGIcSaQeAeR8A5j+efnyeAPgZgJ4xwM8Yhv5kpnX+76r/SAMwDONB87+apk32Y/EoxEy0AG6YOnuH7dM8OUWpjwAwN8HhijTtrwBWGQY/UtHLK4a3Xflk76ZVJD9JowaBtSdPH7XrdmMnp1J0DJjMfXUYgLFqgKMVOGCfx3DZl75m5tPZ2Tk+qS4wcQLYVTf7kGGgk9jASUR0lPkPoBqbcsgsXgFopQF9pW7Qijv15/56WlubHoG8E5PiXEBrOH3WoZlU6niATgDjIyAMVxUAT58COmZiNT1e9cR/+Kpb53Ua/PPtWpvXqpqzH3klQgC3TMsflkrROcQ4hYB9/QAZcMyNYNxeMfj2zJLGe8UdBkx/63JUmVY4OaXxqQCdAmCn0DKxsTCPGwtaOOttM/iS+aD1G83/73EwlnVUOm8c1Xb1izbCRnJobAWw+xBkp2maRl8i4EOR7I6lpOlVAHdWoN/+u7UP3z95+fKKpWkyyBGBl86cud0uevpTKaJTwTip54cvR7HCmrSt++vNgR/6C2jR0m1T0gH+VYVx3RUtjffMBYyw8vVz3dgJYHv2a7uNpJEFAp1L3b/KJumzHsBtWxg/Ht5SfCpJhftcK1Wys09KUepMgKf6vJav4Qdyf30iuNUF9s/hBYP5R6mWxgVxO9qIjQC+eWph5zGjeDaYvmL+su/rLopCcMLDBvNNG9qNlnG/aN4UhZRVy7ErW3jvMI3PBdMZAPZQLT8n+Qzk/oZwgf2XWGsY/N3Hntlw48RVi8pO1ldtTuQF0Lx0ZZfR6W8APBPAdqoBViCfDhBu7dC7rhjVetW/FchH+RQqufrzNKQuiNupk6HcnwUXuG3fntPBl6dLjT+JuiOMrAAyQHq2cHaKUIR5UbJ8ahEw/8W+tRNbvjuydOW/ag1O4N+pks1P0Yi+Q8DBcax/KPdnwwVui+bRsoELh7UWH44qr0gK4JbcrEPTSN9A6ly3F6X+mye3F3dBv3xEaf4zUUrcr1zLp+dPSKfocsT4xzIr7s+mC+wZzqYXuaW9o5wfs2xB790nfrXK87iREsDXc/mxOxAVwbjAcxJJDEi4vn1z+dIoblwv2rVlWv3EjJZq7rkI3ouQysbgKceCPnecpfz4jvtASx+wNHabQZsMA99MtRavjdJhcWQEsJwtfDhFWEKAeeuQfLwjsAmMeavXrVu4//JbOr0Lq26kzVNn7DUyM6IJ4BxAkfkOOCVqx/05c4Fvy+zBt8qV3Oi2+S85zTfIeco3n6dOTWHYAZeCMQdAKkg4CVvrXzqMfLrU1BrXul+ru3j7nTC6AMYlAEbEtc7+ddlxf30C6MwF9kynVyvQz8iUmu5WnbHSAtgxdfa7hme0EgHmvbryCYAAA/d2dHZ8YbulC9cFsFxgS+jZ/IUa0XejcreGV2CcuD8PXGBPCL6aSo3fUPmQWFkBNM/PpLXUPaTMDeRebclIxHldZz4/3dJ4RySyHSLJztNnTRiWSv2UUL3vO3EfJ+7PGxfYh/qPmzpw8vbLiq+pCF9JAaxkZ5+cIu1nSTpMUXFzAHzrq+3GV6J4IbV56sRIT6jXiC5N6j5y4/68c4HVSM91lfkTI9oan1VtnysngHouP0MDXaUaqATns6ZiGNlMa9MfosKgKzvz/RnK3EzAB6OSsx95unF/HrtAM9zGsoFPqnbNoFICqOcK12jAV/3YDBLTNYFZVCpeqfL5HLPCSjafTRGVXFcb8QBeuD+PXaAZrkNnPZduab5TFbzKCKCeLSzSCF9UBYzkMRAB/s3rmztzY+9c+LpqfHjuXA3/7GoCYN4SmfiPF+7PBxdohtR15jPTLY0tKjRJCQHUc4VrNcB8iIF81CewpmzgNJUOZcwne++Y0ZYScKz6+PzP0Ev354MLNA8iWGfUqSCCoQsg5wrmpQnf9H9byApeEtBhZFW4ZrBzav2BwzOpu/57n/N4L+uLciwv3Z9PLrAaVod+frrUfGOYrEMVQD2bL2hE88IEIGu7IMBUTy3z5ruI4GrqlmmFIzMaTPGLxJOYXRVrcbLp/nD1TJDHN7iwecvvjAW9T422mE3tYQYbX0q1NF1fe6Q/I0ITwMq0/LkpjUJVf3+QJi7qj9rKz14c9DtKKrnCp1KAeZ1iYu7osLKz/HB/frpA8+V0FfCJmVLjfVbq83pMKAJYzuWPS4PMd1nIJwYEmPjXL27pmrpP29UdQZRTmTb7iylNWxTEWlFawy/31yeAPrlAAG926fjQiCXFfwbNO3AB7Jr6jYOHZYb9EcD2QRcr6/lHgIG7tFLRfEeGry9617P5b2hE5qPZ5dOPgJ/uz2cXaIb/5+ubO44M+gqDQAVw09SLx22XGf0oAXvL7o0lgTvbys9+3q/D4Uq2cE6KcFMsybksig8aD8w5z/Nzf/3Tqp4LvOJG0JPPu8x4wOn3t5WfPdGv/TPQioEKoJErPEzAEX6Qk5jKELiNSsWzvM6mMq3+8ykt1eZ13KjHqwrflMmggycEWgo/8Ryw9EHvhZCpSC3zGoIqJjAB5FzDdwD+VlCFyTrhETCIfphaPO8irzLoeWKz8o9W8qpeK3H4Y4cBR38wcOF7hyP0QQgr4OOD+lEkEAHsuVzhT1YaK2PiQcAw+Mup1sbr3FbTlZ39vgxpjxAwym2sOMxXRfh8FsJ17eX2D4xpu9Z8zauvH98F8N9TZ4zcOzPi73Khqq99VDF4uQz+8LBS4yqnyZkvId9VzzxOwAFOY8RlnqrC56MQ3kel4gl+/6jmuwDqdQ0/0JgvjMtGlDpsEVi7qQPvd/osOL2usERjnGZrxZgNjorwDSiEKx8FPbkaWL/RWVcIM2hxcaGzydZm+SqA5Wn1H09rqVAucLRWvowKgMADVCqab+OxdXlM0n/xrQrfqR8H7Rrtm1yqP5a4EMItevmQ4UsWmEeQvnz8FEAycoXnCdjPl8wlaJQImI/SsnztXs/9vU9FqUCvcuWjDwOmRF/4BnSEKx4FPWXbET5EpeJku/+AWu2HbwIoDzmw2oJEjOvoMLoOHNV61b+tVGvkCn8g4MNWxsZlTFyFzwsh1Nk4Pd3SZD4h3vOPLwLYmcuPHw56GkDa84wlYFQJ3E2l4idr/UteyRa+kCLcEtUi7eadFOF7hxC+sgFYer9VR7hm9dp1B/rx2lZfBNDIFh4kwiS7m0HGx5tArX/Jqy++Bz0DYOc4k6ieDI3poa7dvnGPEOKp1TWeNEOXUWneXLvxa433XAArudnTUtCUeNprreLl74ETWPdyqvzu3W9b8NZAK+t1hes0xgWBZxXQgiJ8g4O2IoSdZWPfkW1Na7xsl+cCaGQL/yHCXl4mKbFiRWDAH0Q219XvPZJTls4RRo1GVfimHNv944bHz+mLGota+VbvNb7+dgzoCIl/Sosbz6wVw87fPRVAfdrsizRN+76dBGRs0gjQq+s2vbrvnr9ctHnbyrku3wymWbGjcdB4GBecCm1crI/qPW+bYRjQvn5l/2sIjS4dB3n52CzPBJAnzU3znl1rCNjDcxoSMF4E+j1Jeu3J00ftMWbnlwCMiVeh3dVUHeD0KcBB4yN/XZ/f/ak6wKX3A0sfwMDixLdSqfELXuXhmQDqufx0DRTao629AiJxgiDwdheoZwuXaISrg1g5zDXkHOAQ5wB7D31XPjaI8PXNNToNnjCytXG1F730TACNXOEFuejZi5YkI8a274IwcoV/EHBwMirvcYTyK3C3O7YufNtujxupVDzfi/3iiQAm/bYlLxqRwBh/o1LxA525/P7DQc8lsP5uAUioEPYKH618zEnrK50Gv9sLF+iJABq5wjPyxA4nfUz2nDJ4Yor5fzXSvpdsEskRwt7LXRwK39ZtQrieFhe/5HbfuBZAeVil2xYkd74Buo6I9yPGJ5JL4e2Vx9UReiZ8vbgYXZs6sZfTJw31hnEtgEaucAcBU2QDCwEHBN5kYHvXm9DBwqpPic3TYMw7PZbdD1rh6FC3Vpu+RaXi5bUGDfV3V3vvrSmX7DFqxMj/ANDcJCFzhYAQGJhAVIWw7zFY/ghfL6yXV69dt5+be4RdCSBnC5eCcJls3uAI8L57gidPhHbLL4JbVFYKnUD15UfTpyh/HaFvL0sapAO6weelWxsdvynQsQDy3LkaP931IhF2D313JCQBU/ww80zQTjuA7/0TSEQwIZ3fWqaqQhi08PWdCiR6Uls8z/ElVI4FsJKb/ZkUtDsTtwNDKpj32xP4Rrf49TVfRDCkboS/rCpCGJbwbduBCusnZFqa73XSFccCKD9+OMHtbM5A4ici6Ixl3GbF7r3ADhrEoDu00rzPO5ha666TgUOuP6V+zC6jU68ByDhZVOZYJzCU+IkIWucY95FVIbxgCmicv+8Q4fUbgOuXev9CdHcNKm+g9l12Xnztm3bDOHKAcueHXczOxlsRPxFBZ2zjOIunHAv6nPn+Kf8+fMd9oKUP+LeAw8g6jC+kS0232p3uSACNXOFuAsx3dsrHJwJ2xE9E0KcmRCxs9WELC2eBxo31JXM2X295yXxnh42+ZLQ1KAN3aaXip+0uY1sAN372kh13HDXS4Ys+7aaXzPFOxE9EMJl7pX/VfrpAVd1fL4MN1L6D3cNg2wJYydVPSSF1h2w3fwi4ET8RQX96EqWobLq/Oed77gKrDy84Y46S7q+3P7rBU9Ktjcvs9Mu2AOq5wvc14CI7i8hYawS6xe8s0E7bW5swxCi5TtA1wsgG8MMFqu7+zGYZwI9SpeKFdhpnWwCNXP4pAh1oZxFVxxqnToa27EEl0vNS/MQJKtHS0JIwXSDNOR/w8Fwg1zUo7f5M2Ays0UrFfe2AtyWAb02r33OUlnrRzgKqjjUvG6Bvng++/IbQf9L3Q/xEBFXdecHk5aULjIL766XaBZ4wotT4vFXKtgSwkp19Woq0JVaDqzyO55wHOngCzCvZ6YobQ0vVT/ETEQytraEv7KULjIL723oe0KhLtzaVrDbAlgByNr8ARN+wGlzVcb3ur08gQnKBQYifiKCqu9D/vLxwgVFyf1WijIXUUpxhla4tATRyDSsJ/FGrwVUd1+v++sQhBBcYpPiJCKq6E/3NywsXGCX313Me8PdaqWhZo+wIIHGuYL7LdYS/bfM3en/3F5YL5P336n64wVj3v/haJcb3PQy6+edWh8u4GBBg8xFax0x0VEnk3F93lZ1UKo7qfRtprcItC2DX6fUHDUulnqgVUPW/93d/obrAAEVQxE/1nelPfm5cIJt3fZh3f0Ts04XKe0aU5j9jJW3LAhiHx18N5v7CcoFVyx6ACIr4WfkqxHeMExcYUfdXbaIOfDpdKt5lpaOWBVDPFuo1QpOVoKqOGcz9hekC/RZBET9Vd2NweTlxgVF1fyZVgzEj1VJcaIWwdQHMFW7QgPOsBFVxTC33F6YL9EsERfxU3Inh5GTHBUbZ/VXpEv2QFs+zdLeaZQE0coX7CTg2nPa5X7WW+wvbBXotgiJ+7vdMnCLYcYFRdn/dPeNfUqnxFCv9syOA/yDA8bP3rSTj1xir7i9sF+iVCIr4+bWToh3XigsM+8YATwgTHqbFxaOsxLIsgJxrWA/wLlaCqjbGqvtTwQW6FUERP9V2nzr5WDEC0Xd/Vd4vUKk43gp5SwI4F9C+nctXzINrK0FVGmOl6QPlG/Y9wk5+HRbxU2nnqZnLUC4wFu6vG3s7lYrmBbbVZ8QO9bEkaO3Zr+22HY16qVYwFf9u1/2p4gLtOkERPxV3n3o5DWUIYuL+qtCpVNQ8E8COqTP3H5HJWH7Cgiptd+r++kQwpHuEt+VnxQmK+Kmy46KRx0AuMEbur9qEV9v17cf9onlTrY5YcoBRvQvEqftTyQXWcoIifrW2uPy9P4GBjEGc3J9Z76YO7LL9sqL55kr3h8BbcrMOzSD9WK1gKv3drftTyQUOJoIifirtuGjlsq0L5Fc2gGYsiFYBNbLdbOh7bdfavLZWUZYc4JZphSMzGv5UK5hKf3fr/lRzgf1FUMRPpd0WvVy2NQhh/+DnB73OsrHvyLamNbViWxTA+okZLfXnWsFU+btX7k81F9grgjxpIjR5qosq2y2yefDVM6u5x839mTW9xZt3H91yzcu1mmNJALtOn/k/w1KZv9UKpsrfvXJ/KrpAVRhLHtEnYBqFqgA+GbnfN2vCt/qKTEsC2Jmb9e7hSP+z5qoKDPDa/anoAhXALCkIAaUJrHr6tWETVy0q10rSkgByXf3e4NS/awVT4e9euz9xgSp0VXIQAvYIeHodIJ9bP4Y7U29aUkt7eXo62i/3Jy7Q0zbFN9jRhwErI3WxRCx7wYwXtZbi3laKs6xpRq7QRcAwK0HDGuOX+xMXGFZHo7Mun3IM6PQTwT/6Geh3j0cn8XhmuopKRUvvAbAjgKsJsPXS4SDZ+u3+xAUG2c1ordUrfn17REQw1AYycJdWKn7aShLWBbCu8CdiHGklaBhj/HZ/4gLD6Kr6a/YXv7598sOfgX4vTjCcDtINVJr3RStrWxfAbMNSIj7VStCgxwTl/sQFBt1ZtdcbTPxEBEPuG/M3qaXxCitZWBZAzhaaQKi3EjToMUG5P3GBQXdW3fVqiZ+IYHi902Fk06WmVisZWBfAXMF8H8gNVoIGOSZo9ycuMMjuqrmWVfETEQynf2XwxGGlxlVWVrcugGcUjoaBFVaCBjkmaPcnLjDI7qq3ll3xExEMvodWH4VlZmZdAHP5sQzaYHlCAHWH5f7EBQbQXAWXcCp+IoLBNZOB1VqpuL/VFW3pmZErrCFgH6vB/R4XlvsTF+h3Z9WL71b8RASD6im1UWneaVZXsymA+TsJ9Bmrwf0cF7b7ExfoZ3fViu2V+IkI+t9Xg7k+1dI43+pKtgSQs4VLQbjManA/x4Xt/sQF+tlddWJ7LX4igv72tsKVSZmW+Q9ZXcWeAOYKnwLwa6vB/RqnivsTF+hXh9WI65f4iQj619+XU+XRu9+24C2rK9gTwKlzR3Om6w0CzDcuBf4x324P84bzKR8HKfSGTl6/AVjxKLD0Aeu/KgVOTxa0Q8Bv8RMRtNMNa2OZ+Q9aS+NHrI3uHmVLAM0JRq7wMAFH2FnE7VhVha9/Xbx+I7BilQih24aHPD8o8RMR9LjRTEVqmddgJ6ptAdTrCkWNkbeziNOxURG+QYVw5WMgUxTlEx0Cxx8FnH1K8Pk23gT87dng143RihXmT2ZaGn9rpyTbAljO5Y9Lg+61s4jdsVEVPhFCu51WczwffxQoQBHkq24FrXpKTRgRysru+T9Hh8A8dWqKMweY5wG385pNXIRPhNDrnRF8vKBEUMTPm94y+JdaqdG2dbftAM10DY+fDNMrfPS547yhoWqU9RvB5jlCOTRWtUNvy8tvERTx824b6Aafl241zyPY+zgSQPbowQiJEb7+PREhtLdLQxztlwiK+HnZVOZNHTRu+2XF1+xGdSaAU2ftzpn0OkeTASRW+AYSwieeA5Y9KD+W2N25AY7n448Ene3dDVAifp437z4qFY93EtWphpmXwywn4Bg7i4rwDULLdIQihHa2UuBjvRJBET/vW6eDz0mXGm9xEtmxAHI2fz6IfmxlURE+K5QAiBBaBBXOMD7uSNA5zp2giJ8vfetcX35j3K5tP2x3Et25AHbfFWI+Hisz2MIifE5aIkLokFog05yKoIifb+0pUalY5zS6YwE0FzSyhTYifL7/4lXhO3Uy6BhLb6Zzmnsi5vFDfwFWPg568vlE1BuFIu2KoIiff12t6HxiZknjPU5XcCWAnGs4EeC+K69F+Jy2ofY8EcLajIIcYVUERfx87cq6y0rFvecChtNV3AkgQJwrrMa4se8Sx+e0BfbmiRDa4+Xn6FoiKOLnJ/3qkwy+Q4uL33aziisB7Ojo2H/4mpfb6D37Hu4mCZlrn4AIoX1mfswYTARF/PygvW1M5k4D40e2Nq52s5IjATSFb8SIEZcCONvN4jLXPQERQvcM3UboL4Iifm6J1p7PwD1aqXhi7ZFDj7AlgFXHN3z4TUQ0ye3CMt9bAvzKBmDRUvmxxFuslqP1iqCIn2VkrgZWYHwiU2q621UQO88DZOa5/72Jw9XxtttkZX5tAsY/noU2z/YtkbUDy4jaBA49EHj86drjZIQrAsz4u9ZSPMRVkJ7J4gC9oKhADHGACjRBUgiEgG7grHRr8TYvFrMlgL0LyqGwF+i9iSHC5w1HiRINAgz8SysV9/MqW0cC2Lt4pVI5R9O0s+ScoFftsB6nKnzL7geteMz6JBkpBCJOwDD4y6nWxuu8KsOVAIoQetUG63FE+KyzkpHxIsDAmkeffu2AiasWlb2qzBMBfJsQvvDiNXTAu8Z4laDE6SYgwic7IekEvHZ/Jk9PBbD6Rc01nMgfO/S3OPqDoIMnJL1nrusX4XONUALEgAADq7VScX+vS/FcAM0Ee58VyB87DDj146Bdd/I679jHqwrfykdBSx+Ifa1SoBCoRUA39Knp1ubba42z+3dfBJDrCgcz468EpDBuLPig/UQILXZGhM8iKBmWGAIM/F4rFT/qR8G+CKCZqJ4rfF8DLupLWoRwyP6J8PmxvSVm9Akwb9GN9w1f0vykH7X4JoA8de5OnOl6joAd35a4KYTv3Q+YIofG1XOmcqjrx76WmHEhQPRDWjxvq5HyuC7fBLD65c42XAzi7w2Yc8KFUITP450s4eJI4PU3wON3LDVu9Ks4fwWw+yXq5rnAgwctwBTCow9D9VfjBPxYIsLn11aWuHEjYLDx1VRL07V+1uWrAJqJl7OzjklTennNImIuhCJ8NXeADBACfQQYeOqhtX88ZPLy5RU/sfgugGbyRq5wBwFTLBUSMyEU4bPUdRkkBN5GoFLBRzM/K/7ebyyBCCBnG3Zj4qcJ2MFqQb1vlIvqoXGv8GHpA95fbW4VoowTAlEk4PMPH9siCUQAqz+I1OXPBdONdvvRJ4Tmr8YUWLp209xq3Xt+1RXhc4xQJiabwNr15TcOdPqeX7voAlUUI1e4h4Dj7SZZFVDzVZvmjyWKCiGv3wCseBQifE66K3OEQDeBiqEfl2ltvj8oHoEKIE+bsw9rxlMEjHJaoCmE9LEPVoVQmc+KVeDr75BDXWUaIolEkwDdQKV5Xwwy90AFsKrwufzZKdDNboqsusGrZypxSPzfVwUAZ8wR8XPTUJkrBIBXXt/cceDYOxe+HiSMwAXQLM7I5e8k0GfcFGpeO0hfmuomhCdz+Y775IEFnpCUIEkmoOs4Ob2k+KugGYQigJzLj2WQ+avwOKcFq+ACxf057Z7MEwJbCRhAa6pUzIbBJBQBNAstZ+uPT1PqHjdFh+0Cxf256Z7MFQIAM156k/hgP293G4pzaAJoJqXnCldqwNedboSqC2w4L5Rb6MT9Oe2azBMCfQSMilGZlGmdvzIsJqEKIE+am+Y9ux4h4DCnAMJygXxdG2ilvJDIad9knhAA49vUUvxOmCRCFUCz8M7TZ00Ylkr/HwHbOQERhgsU9+ekUzJHCGwlwIzlWkvxWPMS3zC5hC6AZvGVafnTUxq1OgURtAsU9+e0UzJPCFQJvPIWb37/6JZrXg6bhxIC2HM+8FoN+IojIOYDFAI6F2i6PzpjjqM0ZZIQEAIwKoyPZlqKf1SBhTICyNOnZ7h9598T8CEnYIJygeL+nHRH5giBHgKMArUUG1XhoYwAmkD4zNnvYl17nICxtgEF4ALF/dnuikwQAn0EmPjX2uLGk1RCopQAmmDMB6imKP0AAZpdUH67QHF/djsi44VAH4HnXm3XDxv3i+ZNKjFRTgCrTjCXnw2QfZvsows0n+9HMxao1DvJRQhEhUD7Fl0/wq83u7mBoKQAmgXZeor0NgT8coHi/txsM5lri8BB44Enn7c1ReXBYd3na4WJsgLIZ87cjvWMeZH04C9UGqhC0wVOnwI6eIKV+i2NEfdnCZMM8oCAeVEcL5wJumRBTJ4wRN+l0rxLPUDjSwi00gqBAAARbElEQVRlBbB6KNz9/EDzR5Gd7FTvtQsU92eHvox1Q4CnHAv63HHgh/4CWrTUTajQ5zLjF9RS/CyFfLHzUCCUFsCqCGZnf5RJW05AynJHPXSB4v4sU5eBLglUb4n46RXV51xW3ykzI7oukIEnXtr02of2/OWizS6x+DpdeQHsFsH8hUz0AzvJ8scOA13g/nmBfH0baIXc8+vrLpTgVQLVUzfHTOyjEeEjj/WdZWPiyLamNaq31o6mhFoL5wrfB3CR5SQ8cIHi/izTloEuCWzr/npDRdQFbi6j8pFhpfmPu0QSyPToCCBAnGtYQmDLts6tCxT3F8gelEUGcH99Ihitpw5VKtBPyJSaH4xKUyMjgNVDhO7HZ91NgPkUidofFy5Q3F9tvDLCGwKm+6PF8wYMFp19yKwbxmnp1ubbvaESTJRICWBVBLsvjzHvFDnCCiKnLpAv/zHoyResLCFjhIArAv3P/fUPFoVzgQb44lSp0TxNFalP5ASwKoJnz92Rt3T9joD3WaHNc86zdV0gP/Ec6Arb73C3koqMEQJvIzCU++s7DFb+LiSeS6XGy6LY2kgKYI8T3JX1zB8JGF8LPB80HvTN82sN6/s7X34DKEZX4lsuXAYGTqCW++sTQWXPBfI1VGq8JHBwHi0YWQGsimD3hdJ/IWDXWjysukBxf7VIyt+9ImA+zZwWzrIUTs1zgXwLlRrPDfupzpYADjIo0gJYFcHT6w/iVMo8HB7ybhGrLjCJ7o+PPAT08N/c7COZ64CAVfenogtkwm9v3/LsSae1tekOSldmSuQFsCqC2Yb3M/EKAnYYimwtF5hE98dfzYKOPAT8vRLo4b8rszHjnogd96fgucBH/lPunLRP29UdUe9TLASwKoK5/OEMMm+ZGz1YU2q5wKS5v17x6/uCiQgG9n226/7UcYH89BvAh8N6j6/XDYqNAFZF8IzC0WzgtwSMGlQEB/lFOGnur7/4iQh6/dUaPJ4T96eCC2TgP11l4yNRuMXNajdjJYDdTnD2xxiaebH0iIEgDOYCk+T+BhM/EUGrXxt345y6v77+hHN/+gud2DJ5ZOnKf7mrXq3ZsRPAnsPh4xj0awKGDSiC/VxgktxfLfHbKoKLQQ//Q63dGoNs3Li/EF3gE2/x5mNVeI2l11sglgLYLYKFTzHwcwLS/aH1d4FJcX9WxU9E0Ouv2dZ4tX6Is7pygHcq/fUN8KS4nPPrzze2AlgVwbqGTzLzHQSMfIcI9rjApLg/u+InImhViqyPq/UjnPVIqD4vMIB31Px5Y9k4fqe2pjfs5BalsbEWwG4RnHMUs2GeE9x+28b0bsYkuD+n4ici6O1X2Sv319cXf+9Y+vOr7frHVXuLm7cdQUxeO1CDSs91gvf2v2PEOHUytGWReXKPo967Fb++L9s1i0GPyDlBR00w/yG2eTumlXV8dIGJED+TcewdYN8X+Iz8AWzQQwTsaWVzxWGMV+InIuh+N3jt/vxygQz8cSO1f2Lnxde+6b5q9SMkRgCrh8O5OfsyG78nwl7qt8Zdhl6Ln4ig83744f76+uHhuUBm/sNrbxmfiPth77adTJQA9okgDNMJ7ut8S6s90y/xExF01ne/3J+XLpAZy19qf+3Tqr/EyFkHBp+VOAGsiuBZc/biirGSgP29BqpCPP7sJNDUE3xJhdetBxbcBnrpVV/ixy2on+6vTwBdPr+SgQde2vTayUkTv0SdA+z/xeKphXGcwT0EHBq3L11V5H0QQRE/+zvFb/fn1gUy+Of/WvvStP2X39Jpv7roz0ikA+zbNNPnjuL2rrsIOCb6rXxnBfyZSaDTvHGCIn72d0gQ7s+NCzSAH2ml4kUqv7jcPnV7MxItgFWnNH16htt3WWznbXP2EIc72gsRFPFz1sOg3J99F8gMpgZqKTY6qyw+sxIvgH2bJ1toYkJ9HIG4EUERP/tfdvN+X5gvOT94gv3JLmbw+g3AikeBpQ8MeX2bbuCsdGvxNhdLxWZqHL/vjpvDucKXGfwDAsWOixMRFPGzt5XCEr53nN8eXAg3V1j/bKal+V57lcV3dOy+6G5bxbnZn2FobQRk3MZSbb4dERTxs949VYSvhhCuLxt84rDWxsesVxb/kSKAA/S458Gqd9Z6z0gUt4cVERTxs9ZZVYXvHUK44c0y65UfpnbdeUaUX2BkrSv2RokADsKr+sY5Mu4iwv/YQ6r+6KFEUMSvdv+iInwDVLLaMIyfpFIp8x2+5iuJE/8RARxiC3D1Mpktt8TxF+KBRFDEb2g9iLDw9S9MhLCHiAighX8DOdcwl8HfjhusbUVQxG/wjRAj4RMh7Ecgbt9pC3LmbAjn8nUM+gkBKWcR1JxliiCOPkxubxvoXHBIl7OEsFMS6whFAG3sNs7lzXeNLCVgjI1p6g/de1fgP6+on2dAGcbY8dUimDghFAGstSX6/Z3PmP0BNrRfEbC3zakyXHECCRa+xB4aiwA6+FLyWYWducK/ItBRDqbLFMUIiPAN2pDYO0IRQIdfRp40N409uxYyYN5MLp8IEhDhs9y02AqhfHct74GBB3K2cA4TbhKQLkEGOF2EzzHs2AmhfG8d74WtEzmXP5xBvyRgDw/CSQifCIjweQY2NkIoAujRnuh5wOpvCDjco5ASxkMC1TcAfv54DyNKKADLAZxDRKujSkME0OPOcV3hOmZcIGA9ButBOHGAHkDsDiEO0DOUMQzE2cJnmXALATvEsLzIlyRC6LiFsRG+XgJiVBzvhaEnVh+moBnL5JDYJ8AehBUhtAwxdsInAmi59+4Gci5/FUDmY4jkoygBEcJBGxNb4RMBDPDLyHX509mgnxBheIDLylI2CYgQ9gGLvfCJANr8crgd3nMLnfkrsVwq4xamz/MTLISJET4RQJ+/RAOF5zNn7sp6poWAY0NYXpa0SSBBQpg44RMBtPll8Go4A4S6fJ6ZvkNA2qu4Esc/AjEWwsQKnwigf98XS5G5bs5RzIb5aC05JLZELPxBMRLCxAufCGD43yfw1Lk7cabLfMjqSQqkIylYJBBhIRTh69djuQ7Q4qb3cxjnGmYwuCmOr+L0k1vYsSMkhCJ8g2wWEcCwv0U96/O0ORNZM24nYF9FUpI0LBJQWAhF+Gr0UATQ4iYPYhifWz/G6NAWEtG50pggiHu7hkJCKMJnsbXyPbMIKshhnM1/gkE3E2H3INeVtbwhEKIQivDZbKEIoE1gQQ2v/kAyrPNWYvp0UGvKOt4S4DnngQ6e4G3QIaJVKpVjM5nMg4EtGIOFRAAVbyJnG2Yx8Ty5ZlDxRg2QHh/+vlX09bpAng/JzMs1TZscPUrhZiwCGC5/S6vztDn/y2TcIYfElnCpMEgHcOllpWLjpYZxPxFN8jspcX/OCIsAOuMW+KyeawZvBPBZaVrg+C0vyMA6Hca0TKlphTmpXC5PTqfTD1gO4GCguD8H0HqmyHfJObtQZnJd4QvMuDZ2L2cPhaa3izKw9E3w+TuWGjduG9kwjAf9dIHi/pz3UQTQObvQZnJuzr4Mw7yD5JjQkpCFtyWwSYfxlXSp6daBsHR0dOw/YsSI5/1AJu7PHVURQHf8Qp3NucJ5DFxFwPahJpLgxRn8m05jywWjWq/691AY/HKB4v7cbT4RQHf8Qp/N2YbdGLyICKeEnkyyEnhFN/ir6dbGJVbK9sMFivuzQn7oMSKA7hkqEYGzhQuYcDUBI5VIKN5JlN4sd168Q9vVG+yU6bULFPdnh/7AY0UA3TNUJgKf/s0JrOnm5TIfUCapeCXSrht8frq18WcA2G5pXrpAcX926YsAekMsAlE42zCPiQvyr5uHzSI83LmlnB3ZtuAFN1G9coG6rp+bTqdvdpOLzDWfTiyfWBLgXP5wBhYT6MBYFhhUUYwuEL6z6unX5k9ctajsdlkvXCAzr9Y0bX+3uch8EcDY7wHO5RsZNFv+pXPU6j9vYZw1vKX4lKPZg0zSdf1mTdPOdhpT3J9Tcu+cJ98L71gqG4mzhQ8zmW4Q4hosd4nzVGpsdnKur9YSblyguL9adO39XQTQHq/Ijubpc0ehvauZgYuk6UO0kfF/W4zyGcOXLPi7n8126gLF/XnbFfkueMtT+WjVBytoxo0EvFf5ZINOkOgKWjzvW364vv6lOHGB4v683xAigN4zjUREzhbyTCjKBqi264WyrueGLWn+U5DNs+sCxf153x3Z/94zjUzEnusGbyCC749rUhYK802vvmVcMu4XzZuCztGOC2RmaJom31ePmyRAPQYaxXCczZ/PRAsI2CGK+TvM+fkK8xczLY2+PqqqVm5WXaC4v1oknf1dBNAZt9jN4mn1e7KWupmAE2JXXP+CGM3r2l+7bM9fLtocdq1WXKC4P/+6JALoH9tIRuZs4Zyee4rj6Abv7SrrF49oa35apebUcoHi/vzrlgigf2wjG5nPmrMXV4zbCIjLOybW6ob+tXRr8x1B/MJrt/FDuUBxf3Zp2hsvAmiPV6JGc13hEubqE2ai+yH+6etvdV489s6Fr6tcxGAuUNyfv12L9N72F41ENwlwLj+eQdcDOC5im2W9bugXqur6+u8u0wUOHz78eaKtlHvcn6aia43LtyNiezou2KNXR7TODdINKOszqa3pjSiR7u8Cxf353z0RQP8Zx2YFPnPmrqxnTDeo6pvpXqiwcVampel3UYS+rQsU9xdMB0UAg+Ecq1U4l5/KoGsI2EOZwhjN1FLMR/1wsVKpnJNKpW4CcNl/D4fnKsM3pomIAMa0sX6X1f1whc5LFXjU1iNlg780rLXxMb9rDiI+M+9nGMYLqVRKzv0FAFwEMADIcV6C62YfwqzdQMARAdf5um4Y9enWphui7vr6czNFkIhWB8wzkcuJACay7d4XzbmGGQw2X9EZwIdv2cTlWdu3XPlqAIvJEjEmEMx+jTFAKW0rAc4W3tvz4NUP+sRlXQXGOZlS090+xZewCSMgApiwhgdRLufyVzFohqebi/mmNwgzdyw1bgyiBlkjGQQ83aPJQCZVWiHA2YbjmfgWAva0Mn6IMU9U2Lggqpe2uKxdpvtMQATQZ8BJDs/n1o9BZ+pqBs5zuNEup1Lx0rj9yJHkPaFa7Q73pWplSD4qE+DcnCMYRomACRbzfGiLrn95+JLmJy2Ol2FCwBEBEUBH2GSSXQJ89twduatrGQiThth0b+gGfz3d2mi+8JvtriHjhYBdAiKAdonJeFcEONswj4kLA2y8v3SWjc+NbGta42oBmSwEbBAQAbQBS4Z6Q4DPKBzNBtoI2K0nopzr8watRLFJQATQJjAZ7g2B6iP4U9oiQ8eN6dbGZd5ElShCwB4BEUB7vGS0EBACMSIgAhijZkopQkAI2CMgAmiPl4wWAkIgRgREAGPUTClFCAgBewREAO3xktFCQAjEiIAIYIyaKaUIASFgj4AIoD1eMloICIEYERABjFEzpRQhIATsERABtMdLRgsBIRAjAiKAMWqmlCIEhIA9AiKA9njJaCEgBGJEQAQwRs2UUoSAELBHQATQHi8ZLQSEQIwIiADGqJlSihAQAvYIiADa4yWjhYAQiBEBEcAYNVNKEQJCwB4BEUB7vGS0EBACMSIgAhijZkopQkAI2CMgAmiPl4wWAkIgRgREAGPUTClFCAgBewREAO3xktFCQAjEiIAIYIyaKaUIASFgj4AIoD1eMloICIEYERABjFEzpRQhIATsERABtMdLRgsBIRAjAiKAMWqmlCIEhIA9AiKA9njJaCEgBGJEQAQwRs2UUoSAELBHQATQHi8ZLQSEQIwIiADGqJlSihAQAvYIiADa4yWjhYAQiBEBEcAYNVNKEQJCwB4BEUB7vGS0EBACMSIgAhijZkopQkAI2CMgAmiPl4wWAkIgRgREAGPUTClFCAgBewREAO3xktFCQAjEiIAIYIyaKaUIASFgj4AIoD1eMloICIEYERABjFEzpRQhIATsEfh/dijlT4T79poAAAAASUVORK5CYII=";

  const leftAlign = totalPost === 0 ? 150 : 40;

  const option = {
    tooltip: {},
    xAxis: {
      max: totalPost,
      splitLine: { show: false },
      offset: 0,
      axisLine: {
        lineStyle: {
          color: "#ec4899",
        },
      },
      axisLabel: {
        margin: 0,
      },
    },
    yAxis: {
      data: ["Thank yous"],
      inverse: true,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    grid: {
      top: "center",
      height: 200,
      left: leftAlign,
      right: 15,
    },
    series: [
      {
        type: "pictorialBar",
        symbol: symbols,
        symbolRepeat: "fixed",
        symbolClip: true,
        symbolSize: 150,
        symbolBoundingData: thankYous,
        data: [
          {
            value: thankYous,
          },
        ],
        z: 10,
        tooltip: {
          show: false,
        },
      },
      {
        type: "pictorialBar",
        itemStyle: {
          opacity: 0.2,
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 3,
          shadowOffsetX: 3,
          shadowOffsetY: 6,
        },
        animationDuration: 0,
        symbolRepeat: "fixed",
        symbol: symbols,
        symbolSize: 150,
        symbolBoundingData: totalPost,
        data: [thankYous],
        z: 5,
        tooltip: {
          show: false,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 200, width: 200 }} />;
};

export default ThankYouChart;
