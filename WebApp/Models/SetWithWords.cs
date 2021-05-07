public class SetWithWords
{
    public string nameOfSet { set; get; }
    public Word[] ids { set; get; }
}

public class Word
{
    public string russian { set; get; }
    public string english { set; get; }
}